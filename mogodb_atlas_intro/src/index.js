require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const connect = require("./config/db")
const userRoute = require("./users/user.route")

//to work with mongoose we need schema and model (in user.model.js)
//schema = information about the data structure, i.e. string or number
//model = instance of the collection


const app = express();
app.use(express.json());
app.use(cors());
app.use("/", userRoute)


app.listen(PORT, async () => {
    await connect();
    console.log(`listen: http://localhost:${PORT}`);
})
