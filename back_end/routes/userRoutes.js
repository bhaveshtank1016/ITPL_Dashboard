const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  createUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
// ✅ NEW: Get all users
router.get("/", protect, getAllUsers);

router.get("/:id", protect, getUserById); // <-- GET USER BY ID FOR EDIT
// Route to get user profile
router.get("/profile", protect, getUserProfile);

// Add new user (Protected)
router.post("/create", protect, createUser);

// Update user profile (Protected)
router.put("/update", protect, updateUserProfile);

// Delete user profile (Protected)
router.delete("/delete/:id", protect, deleteUserProfile);


module.exports = router;
