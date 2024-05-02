const express = require('express');
const mongoose = require('mongoose');
const shortURL = require('./schema');
require('dotenv').config();
const app = express();

app.use(express.json());

const port = 8080;
const connection_string = process.env.URL;

app.get("/", async (req, res) => {
    const urls = await shortURL.find();
    if (urls) {
        res.send(urls);
    } else {
        console.log("first")
        res.send("Hello")
    }
});

const connectDB = async () => {
    try {
        await mongoose.connect(connection_string);
        console.log("db connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.post('/shortTheUrl', async (req, res) => {
    console.log(req.body.fullUrl);
    await shortURL.create({ originalUrl: req.body.fullUrl });
    res.send('URL shortened successfully');
});

connectDB();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
