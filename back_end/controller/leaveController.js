const Leave = require("../models/Leave");

// GET all leaves with pagination & role-based filtering
const getAllLeave = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const userId = req.user?.id;
    const roleName = req.user?.role?.name?.toLowerCase();

    let query = {};

    // Non-admin/HR users only see their own leaves
    if (roleName !== "admin" && roleName !== "hr") {
      query.user = userId;
    }

    // Total count for pagination
    const totalCount = await Leave.countDocuments(query);

    // Fetch data with pagination
    const leaves = await Leave.find(query)
      .populate({
        path: "user",
        select: "name email position role",
        populate: {
          path: "role",
          select: "name",
        },
      })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      list: leaves,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount: totalCount, // Frontend gets actual count
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching leaves",
      error: error.message,
    });
  }
};

// POST a new leave
const addLeave = async (req, res) => {
  try {
    const { from, leave, subject, date, message } = req.body;

    if (!from || !leave || !subject || !date || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newLeave = new Leave({
      user: req.user._id,
      from,
      leave,
      subject,
      date,
      status: "pending",
      message,
    });

    await newLeave.save();
    res.status(200).json({ msg: "Leave added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error adding leave", error: error.message });
  }
};

// UPDATE leave status
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params; // leave id
    const { status } = req.body;

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    res.status(200).json({
      msg: "Leave status updated successfully",
      leave: updatedLeave,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating status", error: error.message });
  }
};

module.exports = { getAllLeave, addLeave, updateLeaveStatus };
