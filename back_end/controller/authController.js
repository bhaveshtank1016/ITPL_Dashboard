const jwt = require("jsonwebtoken");
const User = require("../models/AddUserSchema"); 

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required" });

  try {
    const user = await User.findOne({ email }).populate("role");
    if (!user || !(await user.matchPassword(password))) //There is a method to get the password from bcrypt
      return res.status(401).json({ message: "Invalid credentials" });

// create a token containing the user's id and role 
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        position: user.position,
        status: user.status
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = { loginUser };


