const User = require("../models/AddUserSchema"); 
const Role = require("../models/Role");

<<<<<<< HEAD

// Fetch all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role"); // ✅ Important
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



=======
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Provided by protect middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        joiningDate: user.joiningDate,
        department: user.department,
        address: user.address,
        salary: user.salary,
        role: user.role,
        position: user.position,
        status: user.status
      }
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

<<<<<<< HEAD

// Create new user (signup/admin ke through add krna )
=======
// Create new user
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      position,
      department,
      salary,
      role,
      status,
<<<<<<< HEAD
       profilePhoto,
    } = req.body;

    // Validate required fields
  if (
  !name || !email || !password || !phone || !gender ||
  !dob || !address || !joiningDate || !position || !department || !role
) {
  console.log("❌ Missing field(s):", req.body); // <== add this line
  return res.status(400).json({ message: "All required fields must be filled." });
}

=======
    } = req.body;

    // Validate required fields
    if (
      !name || !email || !password || !phone || !gender ||
      !dob || !address || !joiningDate || !position || !department || !role
    ) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

<<<<<<< HEAD
    // Check if role exists -- role id sahi h ya nhi .
=======
    // Check if role exists
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
    const existingRole = await Role.findById(role);
    if (!existingRole) {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    // Create user (employeeId will be auto-generated in schema)
    const newUser = new User({
      name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      position,
      department,
      salary,
      role,
      status,
<<<<<<< HEAD
       profilePhoto, 
=======
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
<<<<<<< HEAD
       user: newUser //
    });
  } catch (err) {
    console.error("Create user error:", err);
=======
    });
  } catch (err) {
    console.error("Error creating user:", err);
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateUserProfile = async (req, res) => {
  try {
<<<<<<< HEAD
    const {
      _id,
=======
    const user = req.user; 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
      name,
      phone,
      gender,
      dob,
      address,
      position,
      department,
      salary,
      profilePhoto,
<<<<<<< HEAD
      status,
    
    } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.address = address || user.address;
    user.position = position || user.position;
    user.department = department || user.department;
    user.salary = salary || user.salary;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.status = status || user.status;

    //ager ui se new data nhi aaye to putana hi rahne do " || user.status;"

    const updatedUser = await user.save();

    res.status(200).json(updatedUser); // 👈 Send updated user back
=======
      status
    } = req.body;

    // Update fields only if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (address) user.address = address;
    if (position) user.position = position;
    if (department) user.department = department;
    if (salary) user.salary = salary;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (status) user.status = status;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        position: updatedUser.position,
        status: updatedUser.status,
      },
    });
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

<<<<<<< HEAD
//params.id ---ye url se user ki id get krta h than user ko db se delete krta h 
const deleteUserProfile = async (req, res) => {
  try {  
    const userId = req.params.id; // ✅ Use params instead of body
    console.log("Backend received _id:", userId);

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
=======
const deleteUserProfile = async (req, res) => {
  try {
    const user = req.user; // comes from protect middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
  }
};



<<<<<<< HEAD




module.exports = {getAllUsers, getUserProfile, createUser, updateUserProfile, deleteUserProfile };
=======
module.exports = { getUserProfile, createUser, updateUserProfile, deleteUserProfile };
>>>>>>> 1449f656236919d26932888f09665a9a47f4c246
