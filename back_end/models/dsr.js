const mongoose = require("mongoose");

const dsrSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    attachment: String,
    projects: [
      {
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        todoTask: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dsr", dsrSchema);
