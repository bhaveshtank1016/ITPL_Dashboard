const mongoose = require("mongoose");

const employeeReferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String },
  relationship: { type: String },
  experience: { type: Number },
  linkedin: { type: String },
  notes: { type: String },
  filePath: { type: String }, // For uploaded file path
}, { timestamps: true });

module.exports = mongoose.model("EmployeeReference", employeeReferenceSchema);
