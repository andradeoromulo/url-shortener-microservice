const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Url = new Schema({
    original_url: String,
    short_url: String
});

module.exports = mongoose.model("Url", Url);