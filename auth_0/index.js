
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();


// const clientID = process.env.CLIENTID;
// const clientPasswd = process.env.CLIENTPASSWD;

const clientID = "a40192645945edf19b58"
const clientPasswd = "1a82a058548a10691c698ab219ecfb6f46a91462"


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//signup route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/github/callback", async (req, res) => {
    const { code } = req.query;

    const { access_token } = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                client_id: clientID,
                client_secret: clientPasswd,
                code,
            }),
        }
    )
        .then((e) => e.json())
        .catch(console.error);

    console.log("Access", access_token);

    const userDetails = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then((x) => x.json())
        .catch(console.error);

    console.log(userDetails);

    console.log("github code", code);
    return res.send("sign with github done")
})

app.listen(8080, () => {
    console.log("http://localhost:8080");
})