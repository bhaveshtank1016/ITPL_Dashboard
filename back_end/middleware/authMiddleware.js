const jwt = require("jsonwebtoken");
const User = require("../models/AddUserSchema");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).populate("role"  );

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};


const isAdmin = (req, res, next) => {
    console.log("User role:", req.user ? req.user : "No user");
  // ✅ Add null checks before accessing role.name
  if (!req.user || !req.user.role || req.user.role.name !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { protect, isAdmin };
