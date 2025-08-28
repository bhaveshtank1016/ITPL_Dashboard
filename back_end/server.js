const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Route imports
const dsrRoute = require("./routes/dsr-router");
const holidayRoute = require("./routes/holiday-router");
const resignRouter = require("./routes/resign-router");
const leaveRouter = require("./routes/leave-router");
const userRouter = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRouter = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoute");
const empRefRoutes = require("./routes/employeeReferenceRouter");

const app = express();
dotenv.config();
connectDB();

// Body parser
app.use(express.json());

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/dsr", dsrRoute);
app.use("/api", holidayRoute);
app.use("/api", resignRouter);
app.use("/api", leaveRouter);
app.use("/api/user", userRouter);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRouter);
app.use("/api", roleRoutes);
app.use("/api/ref", empRefRoutes);

// Server Start
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
