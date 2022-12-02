const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const nodemailer = require("nodemailer");
const hbs = require("handlebars")
const fs = require("fs");


const app = express();
app.use(express.json());

const blacklist = [];

const emailUsername = "freida.cassin@ethereal.email"
const emailPassword = "HzcAZ9TY8KMeZkBsdN"

const transport = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: emailUsername,
		pass: emailPassword
	}
});

// created a middleware
app.use((req, res, next) => {
	const token = req.headers.authorization;
	// if (!token) {
	// 	return res.send("give token")
	// }
	try {
		const verification = jwt.verify(token, "passwdforServer");
		if (verification.exp > new Date().getTime()) {
			return res.send("token is expired");

		}
		if (blacklist.includes(token)) {
			return res.send("token is already used");

		}
		next();
	} catch {
		next();
	}
})


app.get("/", (req, res) => {
	res.send("hello");
});

app.post("/signup", async (req, res) => {
	const { name, email, password, age } = req.body;
	const token = req.headers["authorization"];
	const hash = await argon2.hash(password)
	try {
		if (token) {
			const decode = jwt.decode(token);
			if (decode) {
				if (decode.role === "admin") {
					const user = new UserModel({ name, email, hash, age, role: "instructor" });
					await user.save();
					return res.status(201).send("instructor created successfully");
				} else {
					return res.status(403).send("you are not admin to create instructor")
				}
			}
		}
	} catch (e) {
		console.log("you are not admin to create instructor");
	}
	const user = new UserModel({ name, email, password: hash, age });
	await user.save();
	// const html = await fs.readFile("./mail.html", "utf-8");
	const template = hbs.compile(fs.readFileSync("./mail.hbs", "utf-8"));
	transport.sendMail({
		to: email,
		from: "dummyemail@gmail.com",
		subject: `Hello ${name} !`,
		// text: "Test email"
		html: template({ user: name, license: age > 18 ? "You are eligible for license" : "You are not eligible for license" }),
	}).then(() => {
		console.log("success");
	})

	return res.status(201).send("student created successfully");

});

app.post("/createlecture", (req, res) => {
	const token = req.headers.authorization;
	try {

		const { role } = jwt.decode(token);
		if (role !== "instructor") {
			return res.status(403).send("You are not allowed to create lecture")
		} else {
			return res.send("lecture created sucessfully")
		}

	} catch (e) {
		console.log(e.messgae);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email, password });
	if (user) {
		// generate token
		const token = jwt.sign(
			{ id: user._id, name: user.name, age: user.age, role: user.role },
			"passwdforServer",
			{
				expiresIn: "7 days"
			}
		);

		const refreshToken = jwt.sign({}, "REFRESHSECRET", {
			expiresIn: "10 days"
		}
		)
		return res.status(200).send({ messgae: "Login success", token, refreshToken });
	}
	return res.status(401).send("Invalid creds");
});


//verification private route
app.get("/user/:id", async (req, res) => {
	const { id } = req.params;
	const token = req.headers["authorization"];
	if (!token) {
		res.status(401).send("Unauthorized");
	}
	if (blacklist.includes(token)) {
		return res.send("token already expired");

	}
	try {
		const verification = jwt.verify(token, "passwdforServer");
		if (verification) {
			const user = await UserModel.findOne({ _id: id });
			return res.send(user);
		}
	} catch (e) {
		//return res.status(401).send("Invalid token");
		// if(e.messgae === "jwt expired") {
		// 	// token is expired
		// 	blacklist.push(token)
		// }
		return res.send("e.messgae")
	}
});

//refresh
app.post("/refresh", async (req, res) => {
	const refreshToken = req.headers["authorization"];

	if (!refreshToken) {
		res.status(401).send("Unauthorized");
	}
	try {
		const verification = jwt.verify(refreshToken, "REFRESHSECRET");
		// store same info in primary token
		// just store ID in refresh token with the help of ID, get data from DB

		if (verification) {
			const userData = await UserModel.findOne({ _id: verification.id })
			const newToken = jwt.sign(
				{ id: userData.id, name: userData.name, age: userData.age },
				"passwdforServer",
				{ expiresIn: "7 days" }
			);
			return res.send({ token: newToken })
		}
	} catch (err) {
		// refresh token is expired, redirect user to login
		return res.send("refresh token expired, login again");
	}
})

app.post("/logout", (req, res) => {
	const token = req.headers.authorization;
	blacklist.push(token);
	return res.send("user logged out sucessfully");
})

mongoose.connect("mongodb://localhost:27017/jwtd1").then(() => {
	app.listen(8080, () => {
		console.log("server started on http://localhost:8080/");
	});
});
