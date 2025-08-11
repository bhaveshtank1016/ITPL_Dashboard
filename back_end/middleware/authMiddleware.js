const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ Make sure path is correct

// Protect routes (checks JWT and populates user + role)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Populate role.name directly
      const user = await User.findById(decoded.id)
        .populate("role", "name") // Only fetch the name from role
        .select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "No token provided" });
};

// Check admin role
const isAdmin = (req, res, next) => {
  if (
    !req.user ||
    !req.user.role ||
    !req.user.role.name ||
    req.user.role.name.toLowerCase() !== "admin"
  ) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { protect, isAdmin };
