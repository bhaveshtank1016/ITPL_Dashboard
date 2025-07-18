const express = require("express");
const router = express.Router();

const { getUserProfile, createUser, updateUserProfile,getAllUsers, deleteUserProfile  } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", getAllUsers);
// Route to get user profile
router.get("/profile", protect, getUserProfile);

// Add new user (Protected)
router.post("/create", createUser); 
// router.post("/create", protect, createUser);


// Update user profile (Protected)
router.put("/update", protect, updateUserProfile);

// Delete user profile (Protected)
router.delete("/delete/:id", protect, deleteUserProfile);





module.exports = router;
