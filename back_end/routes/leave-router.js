const express = require("express");
const router = express.Router();
const {
  getAllLeave,
  addLeave,
  // deleteLeave,
  // updateLeaveList,
  updateLeaveStatus
} = require("../controller/leaveController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// Protected routes
router.post("/leave", protect, addLeave);
router.get("/leave", protect, getAllLeave);
// router.delete("/leave/:id", protect, isAdmin, deleteLeave);
// router.put("/leave/:id", protect, updateLeaveList);
router.put("/leave/:id/status", protect, updateLeaveStatus); // ✅ For Admin/HR approval

module.exports = router;