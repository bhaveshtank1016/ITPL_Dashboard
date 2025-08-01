const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  createUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

// Route to get user profile
router.get("/profile", protect, getUserProfile);

// ✅ NEW: Get all users
router.get("/", protect, getAllUsers);

// Add new user (Protected)
router.post("/create", protect, createUser);

// Update user profile (Protected)
router.put("/update", protect, updateUserProfile);

// Delete user profile (Protected)
router.delete("/delete", protect, deleteUserProfile);

module.exports = router;
