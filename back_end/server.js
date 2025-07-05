const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const dsrRoute = require("./routes/dsr-router");
const holidayRoute = require("./routes/holiday-router");
const resignRouter = require("./routes/resign-router");
const leaveRouter = require("./routes/leave-router");
const userRouter = require("./routes/userRoutes");
const signRouter = require("./routes/signRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const registerRouter = require("./routes/registerRoutes")
const app = express();

require("dotenv").config();
connectDB();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST ,PUT , DELETE, PATCH, HEAD",
  Credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", dsrRoute);
app.use("/api", holidayRoute);
app.use("/api", resignRouter);
app.use("/api", leaveRouter);
app.use("/api", userRouter);
app.use("/api/", signRouter);
app.use("/api", signRouter);
app.use("/api", attendanceRouter);
app.use("/api",registerRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
