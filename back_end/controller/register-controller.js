const Register = require("../models/RegisterSchema");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // 1. Check all fields are filled
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // 2. Check password match
  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // 3. Check if email already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create new user without confirm_password
    const newUser = new Register({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password : newUser.password
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

exports.getAuser = async (req, res) => {
  try {
    const users = await Register.find({}, { password: 0 }); // exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error while fetching users." });
  }
};