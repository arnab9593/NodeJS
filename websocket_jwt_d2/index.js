const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express(); //not a server its routing

const httpServer = http.createServer(app);
const io = new Server(httpServer);

let count = 0;
const history = [];

io.on("connection", (socket) => {
    count += 1;
    console.log("A new user connected", count);
    socket.broadcast.emit("newuser", count);

    socket.emit("history", history);

    socket.on("newmessage", (message) => {
        history.push(message);
        io.emit("newtext", message);
        console.log("new message received", message);
    });

    socket.on("disconnect", () => {
        count -= 1;
        console.log("A user disconnected", count);
    })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

httpServer.listen(8080, () => {
    console.log("http://localhost:8080");
})

