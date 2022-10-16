const mongoose = require('mongoose');

// schema : Information about structure of Data
const userSchema = new mongoose.Schema({
   
    name: { type: String, required: true},
    lname: {type: String, required: true},
    email: String,
    gender: {type: String, required: true, enum: ["Male", "Female"]},
    age: {type:Number, required: true, min: 20, max: 60},
}, {
    versionKey: false,
    timestamps: true,
});

// Model: Instance of  the Collection
const Users = mongoose.model("movie", userSchema);

module.exports = Users;
