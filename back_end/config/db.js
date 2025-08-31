const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URI from env:", process.env.MONGO_URI); // 👈 Debug line

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ mongodb connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
