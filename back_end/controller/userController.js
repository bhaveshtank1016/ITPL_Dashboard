const User = require("../models/AddUserSchema");
const Role = require("../models/Role");

const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Provided by protect middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // success
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
        status: user.status,
      },
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
      !name ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !dob ||
      !address ||
      !joiningDate ||
      !position ||
      !department ||
      !role
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
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
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.body.id || req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      phone,
      gender,
      dob,
      address,
      position,
      department,
      salary,
      profilePhoto,
      status,
      role,
      joiningDate,
    } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (address) user.address = address;
    if (position) user.position = position;
    if (department) user.department = department;
    if (salary) user.salary = salary;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (status) user.status = status;
    if (role) user.role = role;
    if (joiningDate) user.joiningDate = joiningDate;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role"); // Adjust fields as needed
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  getUserProfile,
  createUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
};
