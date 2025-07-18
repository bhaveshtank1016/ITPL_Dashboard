const Dsr = require("../models/addDsrmodel");
const nodemailer = require("nodemailer");

const addDsr = async (req, res) => {
  try {
    const { email } = req.body;

    //  Save the DSR to the database
    const newDsr = new Dsr(req.body);
    await newDsr.save();

    //  Set up Nodemailer transporter (use Gmail, Mailtrap, etc.)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g., your Gmail
        pass: process.env.EMAIL_PASS, // app password, not your Gmail password
      },
    });

    //  Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DSR Form Submitted",
      html: `<h3>Hello,</h3><p>Dear user,</p><p>Your DSR form has been submitted successfully!</p>`,
    };

    //  Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "DSR submitted and email sent!" });
  } catch (error) {
    console.error("Error submitting DSR:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// GET - Get all DSRs
const getDsr = async (req, res) => {
  try {
    const dsrs = await Dsr.find().sort({ createdAt: -1 });
    res.json(dsrs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addDsr, getDsr };
