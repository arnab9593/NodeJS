const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

const port = 3000;
const connection_string = process.env.URL
app.get("/", (res, req) => {
    req.send("this is the home")
})

const connectDB = async () => {
    try {
        await mongoose.connect(connection_string)
        console.log("db connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


connectDB()
app.listen(port, () => {
    console.log(`http://localhost:3000`);
});
