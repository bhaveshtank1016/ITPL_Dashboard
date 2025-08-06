const mongoose = require("mongoose");

const dsrSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    date: { type: Date, required: true },
    attachment: String,
    todoTasks: {
      type: [String],
      default: [],
    },
    projects: [
      {
        projectName: { type: String },
        projectDescription: { type: String },
        todoTask: { type: String },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dsr", dsrSchema);
