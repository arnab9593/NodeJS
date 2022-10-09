const express = require("express");
const db = require("../db.json")
const fs = require("fs")

//get data of anyone type or duplicate (filter)
const app = express.Router();
app.get("", (req, res) => {
    let { name, messageMatch } = req.query;
    let posts = db.posts;
    if (name) {
        posts = posts.filter((post) => post.name === name)
    }
    if (messageMatch) {
        posts = posts.filter((post) => post.message.includes(messageMatch))
    }
    res.send(posts);
})


app.get("", (req, res) => {
    console.log(req.method, req.url);
    res.send(db.posts)
})

//get data for a specific id using path parameter
app.get("/:id", (req, res) => {
    let id = req.params.id;
    let numId = Number(id);
    let post = db.posts.find((post) => post.id === numId);
    if (post) {
        res.send(post);
    }
    else {
        res.status(404).send(`${id} post not found`)
    }
    res.send(db.post)
})

//post anything
app.post("", (req, res) => {
    console.log(req.body);
    db.posts.push({
        id: Date.now(),
        ...req.body
    })
    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", () => {
        res.status(201)
        res.send(db.posts)
    })
})

app.delete("/:id", (req, res) => {
    let id = req.params.id;
    let numId = Number(id);
    let posts = db.posts.filter((post) => post.id !== numId);
    db.posts = posts;
    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", () => {
        res.send(` id ${id} deleted sucessfully`)
    })

})

app.patch("", (req, res) => {
    res.send("This is a PATCH api")
})

module.exports = app;