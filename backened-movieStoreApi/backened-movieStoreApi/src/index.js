require("dotenv").config();
const express = require('express')
const cors = require('cors');
const connect = require('./config/db')

const userRoute = require('./users/user.route');



const PORT = process.env.PORT;





const app = express()
app.use(express.json());
app.use(cors());
app.use("/users", userRoute);




app.listen(PORT, async () => {
    await connect();
    console.log(`listening on http://localhost:${PORT}`);
})
