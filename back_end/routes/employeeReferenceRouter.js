const express = require("express");
const upload = require("../middleware/upload");
const { protect ,isHR} = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createReference,
  getSingleEmpRef,
  getEmpRef,
  deleteEmpRef,
  updateEmpRef,
} = require("../controller/employeeReferenceController");

// routes
router.post("/addref",protect ,isHR, upload.single("file"), createReference);
router.get("/ref",protect ,isHR, getEmpRef);
router.get("/ref/:id",protect ,isHR, getSingleEmpRef);
router.delete("/delete/:id",protect ,isHR, deleteEmpRef);
router.put("/update/:id",protect ,isHR, updateEmpRef);
module.exports = router;
