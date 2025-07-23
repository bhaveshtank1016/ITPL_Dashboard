// const express = require("express");
// const router = express.Router();

// const { getUserProfile, createUser, updateUserProfile,getAllUsers, deleteUserProfile  } = require("../controller/userController");
// const { protect } = require("../middleware/authMiddleware");


// router.get("/", getAllUsers);
// // Route to get user profile
// router.get("/profile", protect, getUserProfile);

// // Add new user (Protected)
// router.post("/create", createUser); 


// // Update user profile (Protected)
// router.put("/update", protect, updateUserProfile);

// // Delete user profile (Protected)
// router.delete("/delete/:id", protect, deleteUserProfile);





// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllUsers,
  deleteUserProfile,
} = require("../controller/userController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// ✅ Get all users (optional: only admins)
router.get("/", protect, getAllUsers);

// ✅ Get own profile
router.get("/profile", protect, getUserProfile);

// ✅ Create new user (admin-only or protected)
router.post("/create", protect, createUser);

// ✅ Update existing user (authenticated)
router.put("/update", protect, updateUserProfile);

// ✅ Delete user by ID
router.delete("/delete/:id", protect, deleteUserProfile);

module.exports = router;

