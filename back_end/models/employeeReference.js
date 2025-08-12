const mongoose = require("mongoose");
const EmployeeReference = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeReference", EmployeeReference);
