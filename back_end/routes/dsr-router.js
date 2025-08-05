const express = require("express");
const router = express.Router();

// ✅ Correct destructuring import
const { addDsr, getDsr } = require("../controller/add-Dsr-Controller");
const { protect } = require("../middleware/authMiddleware");


// ✅ Route setup

router.post("/create", protect, addDsr);
router.get("/getDsr", protect, getDsr);


module.exports = router;
