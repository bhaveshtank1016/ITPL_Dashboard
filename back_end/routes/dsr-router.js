const express = require("express");
const { addDsr, getDsr, deleteDsr, updateDsr, getDsrById } = require("../controller/DsrController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();
// Add new dsr (Protected)
router.post("/create", protect, addDsr);
// NEW: Get all 
router.get("/", protect, getDsr);
// get single dsr 
router.get("/:id",protect, getDsrById);
// delete dsr 
router.delete("/delete/:id", protect, deleteDsr);
// update dsr 
router.put("/update/:id", protect, updateDsr);




module.exports = router;
