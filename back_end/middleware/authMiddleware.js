
const jwt = require("jsonwebtoken");
const User = require("../models/AddUserSchema");

// Middleware to verify JWT and set req.user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Populate user and their role
      const user = await User.findById(decoded.id).populate("role");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// Middleware to check if user has admin role
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role.name !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = { protect, isAdmin };
