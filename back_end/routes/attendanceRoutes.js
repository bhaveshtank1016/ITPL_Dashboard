const express = require("express");
const router = express.Router();
const { checkIn, checkOut, getAttendance } = require("../controller/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.post("/attendance/checkin", protect, checkIn);
router.post("/attendance/checkout", protect, checkOut);
router.get("/attendance", protect, getAttendance);

module.exports = router;
