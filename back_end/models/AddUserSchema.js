const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    unique: true
  },
  salary: {
    type: Number,
    default: 0
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Resigned"],
    default: "Active"
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  complete: {
  type: Number,
  default: 0
},
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


// Pre-save hook to hash password and generate employeeId
userSchema.pre("save", async function (next) {
  try {
    // Hash password if modified 
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Auto-generate employeeId if not provided
    if (!this.employeeId) {
      const lastUser = await this.constructor.findOne().sort({ createdAt: -1 });
      
      let lastId = 0;
      if (lastUser && lastUser.employeeId) {
        const match = lastUser.employeeId.match(/EMP(\d+)/);
        if (match) {
          lastId = parseInt(match[1]);
        }
      }

      const newId = String(lastId + 1).padStart(3, "0");
      this.employeeId = `EMP${newId}`;
    }

    next();
  } catch (error) {
    next(error);  
  }
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
