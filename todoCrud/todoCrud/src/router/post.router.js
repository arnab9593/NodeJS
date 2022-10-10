const Express = require("express");
const fs = require("fs");
const db = require("../db.json");
const app = Express.Router();

//filter & sorting
app.get("/", (req, res) => {
    // console.log(req.method,req.url);
    let { name, massage, sort, order } = req.query;
    let posts = db.posts;
    if (name) {
        posts = posts.filter((post) => post.name === name)
    }
    if (massage) {
        posts = posts.filter((post) => post.massage.includes(massage))
    }
    if (sort !== "" && order !== "") {
        if (order === "asc") {
            posts = posts.sort((a, b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0))
        } else if (order === "dec") {
            posts = posts.sort((a, b) => (a[sort] < b[sort]) ? 1 : ((b[sort] < a[sort]) ? -1 : 0))
        }
        res.send(posts);
    } else if (sort !== "" && order !== "" && name !== "") {
        posts = posts.filter((post) => post.name === name)

        if (order === "asc") {
            posts = posts.sort((a, b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0))
        } else if (order === "dec") {
            posts = posts.sort((a, b) => (a[sort] < b[sort]) ? 1 : ((b[sort] < a[sort]) ? -1 : 0))
        }
        res.send(posts);
    }
})

app.get("/:id", (req, res) => {
    let id = +req.params.id;
    let post = db.posts.find((post) => post.id === id)
    console.log({ post })
    if (post) {
        res.send(post)
    } else {
        res.status(404).send(`The post is not found`)
    }
})
app.post("/", (req, res) => {
    // db.posts.push({id:3,name:"Rohan"});
    console.log(req.body.name)
    db.posts.push({
        ...req.body,
        id: Date.now(),
    });
    fs.writeFile("./src/db.json", JSON.stringify(db), "utf-8", () => {
        res.status(201).set("content-type", "application/json").send(db.posts);
    })
})
app.patch("/:id", (req, res) => {
    // db.posts.push({id:3,name:"Rohan"});
    let id = +req.params.id;
    let state = req.body.status
    const updatedTodo = db.posts.map((post) => post.id === id ? { ...db.posts, status: true } : db.posts);
    // db.posts.push({
    //     updatedTodo
    // });
    db.posts = updatedTodo
    console.log(updatedTodo)
    res.send(db.posts)
    // fs.writeFile("./src/db.json",JSON.stringify(db),"utf-8",()=>{
    //     res.status(201).set("content-type","application/json").send(db.posts);
    // })
})
app.delete("/:id", (req, res) => {
    let id = +req.params.id;
    let posts = db.posts.filter((post) => post.id !== id);
    db.posts = posts;
    fs.writeFile("./src/db.json", JSON.stringify(db), "utf-8", () => {
        res.send("Deleted the post")
    })
})


module.exports = app;