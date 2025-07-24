const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const dsrRoute = require("./routes/dsr-router");
const holidayRoute = require("./routes/holiday-router");
const resignRouter = require("./routes/resign-router");
const leaveRouter = require("./routes/leave-router")
const userRouter = require("./routes/userRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const authRouter = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoute");


const app = express();
dotenv.config();
connectDB();

// Body parser with increased payload limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" })); 

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD", 
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api", dsrRoute);
app.use("/api", holidayRoute);
app.use("/api", resignRouter);
app.use("/api", leaveRouter);
app.use("/api/user", userRouter);
app.use("/api", attendanceRouter);
app.use("/api/auth", authRouter);
app.use("/api", roleRoutes);


// Server Start
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
