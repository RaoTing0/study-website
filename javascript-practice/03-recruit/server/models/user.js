const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({ account: String, password: String });

console.log('新建一个user集合');

module.exports = mongoose.model("users", userSchema);
