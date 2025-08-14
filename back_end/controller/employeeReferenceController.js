const EmployeeReference = require("../models/employeeReference");

exports.createReference = async (req, res) => {
  try {
    const { name, email, phone, position, company, relationship, experience, linkedin, notes } = req.body;

    if (!name || !email || !phone || !position) {
      return res.status(400).json({ message: "All required fields must be filled" });
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
      file: req.file ? req.file.filename : null
    });

    await newRef.save();

    res.status(201).json({ message: "Employee reference added successfully", data: newRef });
  } catch (error) {
    console.error("Error creating employee reference:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
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
