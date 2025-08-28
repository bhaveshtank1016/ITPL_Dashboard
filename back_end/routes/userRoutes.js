const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  createUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
  getManagers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
// ✅ NEW: Get all users
router.get("/", protect, getAllUsers);
// Route to get user profile
router.get("/profile", protect, getUserProfile);

// Add new user (Protected)
router.post("/create", protect, createUser);

// Update user profile (Protected)
router.put("/update", protect, updateUserProfile);

// Delete user profile (Protected)
router.delete("/delete/:id", protect, deleteUserProfile);

// fetch only role manager
router.get("/managers", getManagers);
// fetch by user id
router.get("/:id", protect, getUserById);

module.exports = router;
