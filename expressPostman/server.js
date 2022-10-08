//1 import
const express = require("express")
const db = require("./db.json")
const fs = require("fs")

//2 create
const app = express()

//api code
app.get("/", (req, res) => {
    console.log(req.method, req.url);
    res.send("Hello World!, welcome to home page");
})

//get data of anyone type or duplicate (filter)
app.get("/posts", (req, res) => {
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


app.get("/posts", (req, res) => {
    console.log(req.method, req.url);
    res.send(db.posts)
})

//get data for a specific id using path parameter
app.get("/posts/:id", (req, res) => {
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
app.post("/posts", (req, res) => {
    db.posts.push({
        id: Date.now(),
        message: "New message added"
    })
    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", () => {
        res.status(201)
        res.send(db.posts)
    })
})

app.delete("/posts/:id", (req, res) => {
    let id = req.params.id;
    let numId = Number(id);
    let posts = db.posts.filter((post) => post.id !== numId);
    db.posts = posts;
    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", () => {
        res.send(` id ${id} deleted sucessfully`)
    })

})

app.patch("/posts", (req, res) => {

    res.send("This is a PATCH api")
})

//3 listen
app.listen(8080, () => {
    console.log("Listening in port 8080");
})

