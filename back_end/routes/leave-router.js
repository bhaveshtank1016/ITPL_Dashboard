const express = require("express");
const router = express.Router();
const {
  getAllLeave,
  addLeave,
  deleteLeave,
  updateLeaveList,
} = require("../controller/leaveController");

// POST new leave
router.post("/leave", addLeave);

// GET all leaves
router.get("/leave", getAllLeave);


// DELETE a leave
router.delete("/leave/:id", deleteLeave);

// ✅ PUT (update) a leave
router.put("/leave/:id", updateLeaveList);

module.exports = router;