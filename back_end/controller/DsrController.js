const Dsr = require("../models/dsr");
const nodemailer = require("nodemailer");

const addDsr = async (req, res) => {
  try {
    const { userId, email, date, attachment, projects } = req.body;

    if (!userId || !email || !date) {
      console.error("❌ Missing email in request body");
      return res.status(400).json({ message: "Email is required" });
    }

    // 🔧 Fix: Define new DSR instance
    const newDsr = new Dsr({
      userId,
      email,
      date,
      attachment,
      projects,
    });

    const savedDsr = await newDsr.save();
    console.log("✅ Saved DSR from DB:", savedDsr);

    // Generate HTML content for projects
    const generateProjectHTML = (projects) => {
      if (!projects || !projects.length)
        return "<p>No project details provided.</p>";

      return `
        <h4>Project Details:</h4>
        <ul>
          ${projects
            .map(
              (proj) => `
            <li>
              <strong>Project Name:</strong> ${proj.projectName || "N/A"}<br/>
              <strong>Description:</strong> ${
                proj.projectDescription || "N/A"
              }<br/>
              <strong>Todo Task:</strong> ${proj.todoTask || "N/A"}
            </li><br/>
          `
            )
            .join("")}
        </ul>
      `;
    };

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
      html: `
        <h3>Hello,</h3>
        <p>Your DSR form has been submitted successfully!</p>
        <p><strong>Date:</strong> ${date}</p>
        ${generateProjectHTML(projects)}
      `,
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
    const dsrs = await Dsr.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 }); // ✅ Only fetch 'name' from User model
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

// update

const updateDsr = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDsr = await Dsr.findByIdAndUpdate(id, updateData, {
      new: true, // returns the updated document
      runValidators: true, // ensure validation is applied
    });

    if (!updatedDsr) {
      return res.status(404).json({ message: "DSR not found" });
    }

    res.status(200).json({
      message: "DSR updated successfully",
      updatedDsr,
    });
  } catch (error) {
    console.error("❌ Error updating DSR:", error.message);
    res.status(500).json({
      message: "Error updating DSR",
      error: error.message,
    });
  }
};

module.exports = {
  addDsr,
  getDsr,
  deleteDsr,
  updateDsr,
};
