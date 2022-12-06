const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    otp: String,
    role: {
        type: String,
        enum: ["Student", "Instructor", "Admin"],
        default: "Student"

    }

})

const UserModel = model("user", UserSchema)

module.exports = UserModel

