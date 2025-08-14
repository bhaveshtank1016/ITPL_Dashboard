const express = require("express");
const router = express.Router();
const { checkIn, checkOut, getAttendance } = require("../controller/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);
router.get("/", protect, getAttendance);

module.exports = router;
