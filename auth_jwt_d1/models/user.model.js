
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    age: Number,
}, {
    versionKey: false,
    timestamps: true,
});

const UserModel = model("user", userSchema);
module.exports = UserModel;
