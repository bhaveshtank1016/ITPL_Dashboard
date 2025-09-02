const express = require("express");
const router = express.Router();
const { getAllResign, addResign, updateResignStatus } = require("../controller/resignController");
const { protect } = require("../middleware/authMiddleware");

// GET /api/resign
router.get("/resign/list", protect, getAllResign);
// GET /api/holidays
router.post("/resign/create", protect, addResign);

// Update resign status
router.put("/resign/status/:id", protect, updateResignStatus);



module.exports = router;