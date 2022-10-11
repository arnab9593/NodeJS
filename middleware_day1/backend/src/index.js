const express = require("express");
const cors = require("cors")
const PORT = 8080;
const db = require("../db.json")

const logger = (req, res, next) => {
    console.log("Before", req.method, req.url);
    next();
    console.log("After", req.method, req.url);
};


const auth = (req, res, next) => {
    if (
        req.body &&
        req.body.username === "Arnab" &&
        req.body.password === "1234"
    ) {
        next()
    }
    else {
        res.send("Not authenticated")
    }
}

const app = express();
app.use(cors());
app.use(express.json());
// app.use(logger);
app.use(auth);

app.post("/", (req, res) => {
    console.log("Request", req.method, req.url);
    res.end("Success on post")
})

app.get("/", logger, (req, res) => {
    console.log("Request", req.method, req.url);
    res.end("Success on get")
})

// app.get("/products", (req, res) => {
//     res.send(db.products)
// })


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
