const express = require("express");
const EmployeeReference = require("../models/employeeReference");

const createReference = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    if (!name || !email || !phone || !position) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newRef = new EmployeeReference({ name, email, phone, position });
    await newRef.save();
    res
      .status(201)
      .json({ message: "Reference saved successfully", data: newRef });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET - fetch all references
const getEmpRef = async (req, res) => {
  try {
    const refs = await EmployeeReference.find().sort({ createdAt: -1 });
    res.status(200).json(refs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching references" });
  }
};
module.exports = { createReference, getEmpRef };
