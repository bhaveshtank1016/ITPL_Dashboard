const Dsr = require("../models/dsr");
const nodemailer = require("nodemailer");

// Add DSR
const addDsr = async (req, res) => {
  try {
    const { userId, email, date, attachment, projects } = req.body;

    if (!userId || !email || !date) {
      return res
        .status(400)
        .json({ message: "User ID, Email and Date are required" });
    }

    // Create DSR
    const newDsr = new Dsr({
      userId,
      email,
      date,
      attachment,
      projects,
    });

    const savedDsr = await newDsr.save();

    // Generate HTML for email
    const generateProjectHTML = (projects) => {
      if (!projects || !projects.length) {
        return "<p>No project details provided.</p>";
      }

      return `
        <h4>Project Details:</h4>
        <ul>
          ${projects
            .map(
              (proj) => `
                <li>
                  <strong>Project Name:</strong> ${
                    proj.projectName || "N/A"
                  }<br/>
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

    // Send email
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

    res
      .status(201)
      .json({ message: "DSR submitted and email sent!", savedDsr });
  } catch (error) {
    console.error("❌ Error submitting DSR:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getDsrById = async (req, res) => {
  try {
    const dsr = await Dsr.findById(req.params.id);
    if (!dsr) return res.status(404).json({ message: "DSR not found" });
    res.json(dsr);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get DSRs (Admin → all, Employee → only own)
const getDsr = async (req, res) => {
  try {
    let query = {};

    // If NOT admin → filter by logged-in user ID
    if (req.user.role.name.toLowerCase() !== "admin") {
      query.userId = req.user._id;
    }

    const dsrs = await Dsr.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(dsrs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete DSR
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

// Update DSR
const updateDsr = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDsr = await Dsr.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
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
  getDsrById,
  getDsr,
  deleteDsr,
  updateDsr,
};
