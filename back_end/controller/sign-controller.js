// const bcrypt = require("bcrypt");
// const API = require("../models/SignInSchema");

// exports.signIn = async (req, res) => {
//   const { email, password } = req.body;

//   // 1. Validate input
//   if (!email || !password) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     // 2. Find user by email
//     const user = await API.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     // 3. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid email or password." });
//     }

//     // 4. Success response
//     res.status(200).json({ message: "Login successful", user: { email: user.email } });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
  
// exports.getuser = async (req, res) => {
//   try {
//     const users = await Sign.find().select("-password");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Unable to fetch users" });
//   }
// };


const bcrypt = require("bcrypt");
const API = require("../models/SignInSchema");

// SIGN UP - Register a new user
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await API.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new API({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// SIGN IN - Log in existing user
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await API.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful", user: { email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL USERS (without passwords)
exports.getuser = async (req, res) => {
  try {
    const users = await API.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
};
