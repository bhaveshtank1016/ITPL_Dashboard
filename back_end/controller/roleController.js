const Role = require("../models/Role");

exports.createRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  try {
    const roleExists = await Role.findOne({ name: name.toLowerCase() });
    if (roleExists) {
      return res.status(409).json({ message: "Role already exists" });
    }

    const role = new Role({ name });
    await role.save();

    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error("Error deleting role:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};