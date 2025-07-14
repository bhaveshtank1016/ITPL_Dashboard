const User = require("../models/AddUserSchema");

exports.createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    dob,
    gender,
    phone,
    position,
    role,
    complete,
    status,
    department
  } = req.body;

  // Validate required fields
  if (
    !first_name ||
    !last_name ||
    !email ||
    !dob ||
    !gender ||
    !phone ||
    !position ||
    !role ||
    complete === undefined || 
    !status ||
    !department
    
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      dob,
      gender,
      phone,
      position,
      role,
      complete,
      status,
      department
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully." });
  } catch (err) {
    console.error("Error occurred while saving user:", err);
    res.status(500).json({ error: "Failed to save user." });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user." });
  }
};
