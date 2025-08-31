const Holiday = require("../models/Holiday");

// GET all holidays
const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.status(200).json(holidays);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching holidays", error: error.message });
  }
};

// POST a new holiday
const addHoliday = async (req, res) => {
  try {
    const { name, date, weekday } = req.body;

    if (!name || !date || !weekday) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHoliday = new Holiday({ name, date, weekday });
    await newHoliday.save();

    res
      .status(201)
      .json({ message: "Holiday added successfully", holiday: newHoliday });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding holiday", error: error.message });
  }
};

// update and edit
const update = async (req, res) => {
  try {
    const id = req.params.id; // fix typo
    const exist = await Holiday.findById(id);
    if (!exist) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    const updatedData = await Holiday.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllHolidays, addHoliday, update };
