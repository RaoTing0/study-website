const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const resumeSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  education: String,
  mobile: Number,
  email: String,
  jobIntension: String,
  educationBackground: String,
  projectExperience: String,
  workExperience: String,
  advantage: String,
  user_id: String
});

console.log("新建一个resume集合");

module.exports = mongoose.model("resumes", resumeSchema);
