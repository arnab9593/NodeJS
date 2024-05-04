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
    if (!(req.body.fullUrl).includes("https://") || !(req.body.fullUrl).includes("http://")) {
        res.send("put valid url")
    } else {
        let job = await shortURL.create({ originalUrl: req.body.fullUrl });
        if (job._id) {
            console.log(job.shortUrl)
        }
        res.send('URL shortened successfully');
    }
});

connectDB();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
