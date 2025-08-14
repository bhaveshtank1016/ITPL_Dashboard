const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  from: { type: String, required: true },
  leave: { type: String },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

const leaveModel = mongoose.model("Leave",leaveSchema);
module.exports = leaveModel;
