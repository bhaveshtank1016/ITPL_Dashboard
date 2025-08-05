const mongoose = require("mongoose");

const dsrSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    email: String,
    date: String,
    attachment: String,
    projectName: String,
    projectDescription: String,
    todoTasks: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("dsr", dsrSchema);
