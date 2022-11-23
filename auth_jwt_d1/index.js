
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
            const token = jwt.sign({ id: user._id, name: user.name, age: user.age }, "passwdforServer");
            return res.send({ message: "Login Sucessful", token });
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
        res.send("Invalid token")
    }
});

app.get("/", (req, res) => res.send("Hello World"));

mongoose.connect("mongodb://localhost:27017/jwtd1").then(() => {
    app.listen(8080, () => {
        console.log("http://localhost:8080");
    });
})
