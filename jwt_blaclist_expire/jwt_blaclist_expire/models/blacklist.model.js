const { Schema, model } = require("mongoose");

const BlackListSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	age: Number,
});

const BlackListModel = model("blacklist", BlackListSchema);

module.exports = BlackListModel;
