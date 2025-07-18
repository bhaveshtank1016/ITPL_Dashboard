const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/AddUserSchema");
const Role = require("../models/Role");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin already exists.");
    } else {
      // Find or create admin role
      let adminRole = await Role.findOne({ name: "admin" });
      if (!adminRole) {
        adminRole = new Role({ name: "admin" });
        await adminRole.save();
        console.log("Admin role created.");
      }

      const adminUser = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: "123456", 
        phone: "9999999999",
        gender: "Male",
        dob: new Date("1990-01-01"),
        address: "Admin Street, Company HQ",
        joiningDate: new Date(),
        position: "Administrator",
        department: "Management",
        salary: 100000,
        role: adminRole._id,
        complete: 100,
        status: "Active",
        date: new Date(),
      });

      await adminUser.save();
      console.log("Admin created successfully.");
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

seedAdmin();


