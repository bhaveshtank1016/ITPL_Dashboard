const express = require("express");
const router = express.Router();
const {
  getAllLeave,
  addLeave,
  // deleteLeave,
  // updateLeaveList,
  updateLeaveStatus
} = require("../controller/leaveController");

const { protect } = require("../middleware/authMiddleware");

// Protected routes
router.post("/create", protect, addLeave);
router.get("/show", protect, getAllLeave);
// router.delete("/leave/:id", protect, isAdmin, deleteLeave);
// router.put("/leave/:id", protect, updateLeaveList);
router.put("/update/:id/status", protect, updateLeaveStatus); // ✅ For Admin/HR approval

module.exports = router;