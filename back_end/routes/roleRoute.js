const express = require("express");
const router = express.Router();
const {
  createRole,
  getRoles,
  deleteRole,
} = require("../controller/roleController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ✅ Only authenticated users can access these
router.post("/addRole", protect, authorizeRoles("admin", "hr"), createRole);
router.get("/rolesList", protect, authorizeRoles("admin", "hr"), getRoles);
router.delete(
  "/roleDelete/:id",
  protect,
  authorizeRoles("admin", "hr"),
  deleteRole
);

module.exports = router;
