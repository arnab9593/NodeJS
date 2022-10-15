const mongoose = require("mongoose");


//schema creation (instance)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    age: { type: Number, required: true }
}, { timestamps: true });
//timestamp is for to store the creation time and updated time of the schema

//model
const Users = mongoose.model("user", userSchema);

module.exports = Users;