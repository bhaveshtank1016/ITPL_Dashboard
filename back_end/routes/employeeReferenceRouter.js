const express = require("express");

const {
  createReference,
  getEmpRef,
} = require("../controller/employeeReferenceController");
const router = express.Router();

// routes
router.post("/addref", createReference);
router.get("/ref", getEmpRef);

module.exports = router;
