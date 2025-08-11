const mongoose = require("mongoose");

const resignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: String,
  subject: String,
  date: String,
  message: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], 
    default: "pending",
  },
});

const resignModel = mongoose.model("Resign", resignSchema);
module.exports = resignModel;
