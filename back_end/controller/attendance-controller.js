const Attendance = require("../models/AttendanceSchema");

// Helper function to calculate status

const calculateStatus = (check_in, check_out) => {
  if (!check_in || !check_out || typeof check_in !== 'string' || typeof check_out !== 'string') return "Absent";

  const [inH, inM] = check_in.split(":").map(Number);
  const [outH, outM] = check_out.split(":").map(Number);

  const inMinutes = inH * 60 + inM;
  const outMinutes = outH * 60 + outM;
  const totalMinutes = outMinutes - inMinutes;

  if (totalMinutes >= 480) return "Present"; // >= 8 hrs
  if (totalMinutes >= 120) return "Half Day"; // 2–8 hrs
  return "Absent"; // < 2 hrs
};

exports.createAttendance = async (req, res) => {
  const { userId, date, check_in, check_out } = req.body;

  try {
    const newRecord = new Attendance({
      userId,
      date,
      check_in,
      check_out
    });

    const saved = await newRecord.save();

    const status = calculateStatus(check_in, check_out);

    res.status(201).json({
      message: "Attendance recorded successfully.",
      data: {
        ...saved.toObject(),
        attendance_status: status // added dynamically in response
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save attendance." });
  }
};



exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find();

    const dataWithStatus = records.map((record) => ({
      ...record.toObject(),
      attendance_status: calculateStatus(record.check_in, record.check_out)
    }));

    res.status(200).json({
      message: "Attendance fetched successfully.",
      data: dataWithStatus
    });
  } catch (error) {
    console.error("GET Attendance Error:", error);
    res.status(500).json({ error: "Failed to fetch attendance." });
  }
};

