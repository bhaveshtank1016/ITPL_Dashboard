const Resign = require("../models/Resign");
// get all resign list and pagination apply 
const getAllResign = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const userId = req.user && req.user.id;
    const roleName = req.user && req.user.role?.name?.toLowerCase();

    let query = {};

    // Non-admin/HR users apna resignation hi dekhen
    if (roleName !== "admin" && roleName !== "hr") {
      query.userId = userId;
    }

    const totalCount = await Resign.countDocuments(query);

    const resign = await Resign.find(query)
      .populate({
        path: "userId",
        select: "name position role",
        populate: {
          path: "role", // role ka pura object laane ke liye
          select: "name",
        }
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });

    res.status(200).json({
      list: resign,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching resignations",
      error: error.message,
    });
  }
};


// post a new resign
const addResign = async (req, res) => {
  try {
    const { from, subject, date, message } = req.body;

    const newResign = new Resign({
      from,
      subject,
      date,
      message,
      status: "pending",
      userId: req.user._id,
    });

    await newResign.save();
    res.status(200).json({ msg: "Resign added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error adding resign", error: error.message });
  }
};

const updateResignStatus = async (req, res) => {
  try {
    const { id } = req.params; // resign id
    const { status } = req.body; // approve ya reject

    // Valid status check
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updatedResign = await Resign.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedResign) {
      return res.status(404).json({ msg: "Resignation not found" });
    }

    res.status(200).json({ msg: "Status updated successfully", resign: updatedResign });
  } catch (error) {
    res.status(500).json({ msg: "Error updating status", error: error.message });
  }
};



module.exports = { getAllResign, addResign, updateResignStatus };
