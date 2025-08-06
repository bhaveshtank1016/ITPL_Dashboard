const Resign = require("../models/resign");
// get all resign list and pagination apply 
const getAllResign = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const totalCount = await Resign.countDocuments(); // total items
    const resign = await Resign.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 }); // optional: sort by date desc

    res.status(200).json({
      list: resign,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error Fetching resign", error: error.message });
  }
};


// post a new resign
const addResign = async (req, res) => {
  try {
    const { from, subject, date, message } = req.body;
    if (!from || !subject || !date || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newResign = new Resign({ from, subject, date, message });
    await newResign.save();
    res.status(200).json({ msg: "resign added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error adding resign", error: error.message });
  }
};

module.exports = { getAllResign, addResign };
