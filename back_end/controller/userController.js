const User = require("../models/AddUserSchema"); 
const Role = require("../models/Role");


// Fetch all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role"); // ✅ Important
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Provided by protect middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        joiningDate: user.joiningDate,
        department: user.department,
        address: user.address,
        salary: user.salary,
        role: user.role,
        position: user.position,
        status: user.status
      }
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Create new user
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      position,
      department,
      salary,
      role,
      status,
    } = req.body;

    // Validate required fields
  if (
  !name || !email || !password || !phone || !gender ||
  !dob || !address || !joiningDate || !position || !department || !role
) {
  console.log("❌ Missing field(s):", req.body); // <== add this line
  return res.status(400).json({ message: "All required fields must be filled." });
}


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Check if role exists
    const existingRole = await Role.findById(role);
    if (!existingRole) {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    // Create user (employeeId will be auto-generated in schema)
    const newUser = new User({
      name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      position,
      department,
      salary,
      role,
      status,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
       user: newUser //
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const {
      _id,
      name,
      phone,
      gender,
      dob,
      address,
      position,
      department,
      salary,
      profilePhoto,
      status
    } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.address = address || user.address;
    user.position = position || user.position;
    user.department = department || user.department;
    user.salary = salary || user.salary;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.status = status || user.status;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser); // 👈 Send updated user back
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // ✅ Use params instead of body
    console.log("Backend received _id:", userId);

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};







module.exports = {getAllUsers, getUserProfile, createUser, updateUserProfile, deleteUserProfile };
