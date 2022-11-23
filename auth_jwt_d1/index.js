
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserModel = require("./models/user.model");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//signup route
app.post("/signup", async (req, res) => {
    const { name, email, password, age } = req.body;
    const user = new UserModel({ name, email, password, age });
    await user.save();
    return res.status(201).send("User created sucessfully");
})

//login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    try {
        if (user) {
            const token = jwt.sign(
                { id: user._id, name: user.name, age: user.age },
                "passwdforServer",
                {
                    expiresIn: "1 days"
                }
            );
            const refreshToken = jwt.sign({ id: user._id }, "REFRESHTOKEN", { expiresIn: "7 days" })
            return res.send({ message: "Login Sucessful", token, refreshToken });
        } else {
            return res.status(401).send("Incorrect credentials")
        }
    } catch (e) {
        return res.send(e.message);
    }

});

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.headers["authorization"];
    if (!token) {
        return res.send("Unauthorized");
    }
    try {
        const verification = jwt.verify(token, "passwdforServer");
        if (verification) {
            const user = await UserModel.findOne({ _id: id });
            return res.send(user);
        }

    } catch (e) {
        console.log(e.message);
        res.send("Invalid token")
    }
});

//refresh route
app.post("/refresh", async (req, res) => {
    const refreshToken = req.headers["authorization"];
    if (!refreshToken) {
        return res.status(401).send("unauthorized");
    }
    try {
        const verification = jwt.verify(refreshToken, "REFRESHTOKEN");
        console.log(verification);
        if (verification) {
            const userData = await UserModel.findOne({ _id: verification.id })
            const newToken = jwt.sign(
                { id: verification.id, name: verification.name, age: verification.age },
                "passwdforServer",
                { expiresIn: "5 min" }
            );
            return res.send({ token: newToken })
        }

    } catch (e) {
        res.send(e.message)
    }
})

app.get("/", (req, res) => res.send("Hello World"));

mongoose.connect("mongodb://localhost:27017/jwtd1").then(() => {
    app.listen(8080, () => {
        console.log("http://localhost:8080");
    });
})
