const mongoose = require("mongoose");

const dsrSchema = new mongoose.Schema({
  email: String,
  date: String,
  attachment: String,
  projectName: String,
  projectDescription: String,
  todoTasks: [String]
}, { timestamps: true });

module.exports = mongoose.model("dsr", dsrSchema);

