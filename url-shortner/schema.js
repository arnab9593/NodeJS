
const mongoose = require("mongoose")
const shortID = require("shortid")

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortID.generate
    }
})

module.exports = mongoose.model('shortUrl', urlSchema)
