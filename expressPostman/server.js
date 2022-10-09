//1 import
const express = require("express")
const postRoutes = require("./router/post.router")

//2 create
const app = express()

//express will parse body in json format
app.use(express.json())
app.use("/posts", postRoutes)

//api code
app.get("/", (req, res) => {
    console.log(req.method, req.url);
    res.send("Hello World!, welcome to home page");
})


//3 listen
app.listen(8080, () => {
    console.log("Listening in port 8080");
})

