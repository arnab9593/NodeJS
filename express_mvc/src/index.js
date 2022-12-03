const express = require("express");
const { studentRouter, teacherRouter } = require("./routes");
const auth = require("./middlewares/auth.middleware");
const time = require("./middlewares/time.middleware");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => res.send("hello"));

//Middlewares
app.use(auth);
app.use(time());

//Routes
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);


app.listen(8080, () => {
    console.log("http://localhost:8080");
})