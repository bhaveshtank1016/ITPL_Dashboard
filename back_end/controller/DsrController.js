const Dsr = require("../models/dsr");
const nodemailer = require("nodemailer");

const addDsr = async (req, res) => {
  try {
    const { email, date, attachment, projects,  todoTasks,  } = req.body;

    if (!email) {
      console.error("❌ Missing email in request body");
      return res.status(400).json({ message: "Email is required" });
    }

    // 🔧 Fix: Define new DSR instance
    const newDsr = new Dsr({
      email,
      date,
      attachment,
      projects,
    });

    const savedDsr = await newDsr.save();
    console.log("✅ Saved DSR from DB:", savedDsr);

    // ✅ Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DSR Form Submitted",
      html: `<h3>Hello,</h3><p>Your DSR form has been submitted successfully!</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "DSR submitted and email sent!" });
  } catch (error) {
    console.error("❌ Error submitting DSR:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getDsr = async (req, res) => {
  try {
    const dsrs = await Dsr.find().sort({ createdAt: -1 });
    res.json(dsrs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete project
const deleteDsr = async (req, res) => {
  try {
    const deleted = await Dsr.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "DSR not found" });
    }
    res.status(200).json({ message: "DSR deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting DSR", error: error.message });
  }
};

module.exports = {
  addDsr,
  getDsr,
  deleteDsr,
};
