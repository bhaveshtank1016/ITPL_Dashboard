const EmployeeReference = require("../models/employeeReference");

exports.createReference = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      company,
      relationship,
      experience,
      linkedin,
      notes,
    } = req.body;

    if (!name || !email || !phone || !position) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newRef = new EmployeeReference({
      name,
      email,
      phone,
      position,
      company,
      relationship,
      experience,
      linkedin,
      notes,
      file: req.file ? req.file.filename : null,
    });

    await newRef.save();

    res
      .status(201)
      .json({ message: "Employee reference added successfully", data: newRef });
  } catch (error) {
    console.error("Error creating employee reference:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getEmpRef = async (req, res) => {
  try {
    const refs = await EmployeeReference.find().sort({ createdAt: -1 });
    res.status(200).json(refs);
  } catch (error) {
    console.error("Error fetching references:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEmpRef = async (req, res) => {
  try {
    await EmployeeReference.findByIdAndDelete(req.params.id);
    res.json({ message: "Reference deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reference" });
  }
};

exports.updateEmpRef = async (req, res) => {
  try {
    const updatedRef = await EmployeeReference.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedRef);
  } catch (err) {
    res.status(500).json({ message: "Error updating reference" });
  }
};

exports.getSingleEmpRef = async (req, res) => {
  try {
    const dsr = await EmployeeReference.findById(req.params.id);
    if (!dsr) return res.status(404).json({ message: "DSR not found" });
    res.json(dsr);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
