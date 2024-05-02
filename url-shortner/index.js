const express = require('express');
const mongoose = require('mongoose');
const shortURL = require('./schema')
require('dotenv').config();
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

const port = 3000;
const connection_string = process.env.URL

app.get("/", async (req, res) => {
    const urls = await shortURL.find()
    res.send(urls)

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

// "https://github.com/arnab9593/NodeJS/tree/master/url-shortner"

app.post('/shortTheUrl', async (res, req) => {
    console.log(req.body)
    //await shortURL.create({ full: req.body.fullUrl })
})

connectDB()
app.listen(port, () => {
    console.log(`http://localhost:3000`);
});
