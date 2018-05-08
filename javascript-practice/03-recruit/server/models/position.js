const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const positionSchema = new Schema({
  companyName: String,
  legalPerson: String,
  address: String,
  requirements: String,
  duties: String,
  publishDate: Date,
  type: String,
  resume_ids: Array
});

console.log("新建一个position集合");

module.exports = mongoose.model("positions", positionSchema);
