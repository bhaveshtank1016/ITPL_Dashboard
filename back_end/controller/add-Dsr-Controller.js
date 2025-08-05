const Dsr = require("../models/addDsrmodel");
const nodemailer = require("nodemailer");

const addDsr = async (req, res) => {
  try {
    const {
      email,
      date,
      attachment,
      projectName,
      projectDescription,
      todoTasks,
      role,
      user,
    } = req.body;

    // 1️⃣ Basic validation
    if (!email?.trim())
      return res.status(400).json({ error: "Email is required" });
    if (!date?.trim())
      return res.status(400).json({ error: "Date is required" });
    if (!projectName?.trim())
      return res.status(400).json({ error: "Project name is required" });
    if (!Array.isArray(todoTasks))
      return res.status(400).json({ error: "Todo tasks must be an array" });
    if (!role) return res.status(400).json({ error: "Role is required" });
    if (!user) return res.status(400).json({ error: "User is required" });

    const newDsr = new Dsr({
      email,
      date,
      attachment,
      projectName,
      projectDescription,
      todoTasks,
      role,
      user,
    });

    // 3️⃣ Save to DB
    await newDsr.save();

    // 4️⃣ Send email
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
    console.error("Error submitting DSR:", error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET - fetch all DSRs
const getDsr = async (req, res) => {
  try {
    const dsrs = await Dsr.find()
      .populate("role")
      .populate("user")
      .sort({ createdAt: -1 });

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
