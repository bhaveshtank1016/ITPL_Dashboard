const express = require("express");
const router = express.Router();
const { createRole, getRoles, deleteRole  } = require("../controller/roleController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// ✅ Only authenticated users can access these
router.post("/addRole", protect, isAdmin, createRole);
router.get("/rolesList", protect, isAdmin, getRoles);
router.delete("/roleDelete/:id", protect, isAdmin, deleteRole);


module.exports = router;
