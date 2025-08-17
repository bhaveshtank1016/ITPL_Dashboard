const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ Protect middleware: verify JWT and attach user
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id)
        .populate("role", "name") // only role.name
        .select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
  return res.status(401).json({ message: "No token provided" });
};

// ✅ Single reusable role authorization middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role?.name?.toLowerCase();
    console.log("User Role:", role); // 👈 Debug here
    if (!role || !allowedRoles.map((r) => r.toLowerCase()).includes(role)) {
      return res
        .status(403)
        .json({
          message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
        });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
