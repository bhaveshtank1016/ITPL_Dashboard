const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const {
  createReference,
  getEmpRef,
} = require("../controller/employeeReferenceController");

// routes
router.post("/addref", upload.single("file"), createReference);
router.get("/ref", getEmpRef);

module.exports = router;
