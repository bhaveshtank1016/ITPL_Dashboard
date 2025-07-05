const express = require("express");
const router = express.Router()
const {createAttendance, getAttendance} = require("../controller/attendance-controller");

router.post("/attend",createAttendance);
router.get("/attend",getAttendance);

module.exports = router;


// checked and working 