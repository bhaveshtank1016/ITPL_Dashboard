const Dsr = require("../models/addDsrmodel"); // Adjust the path to your model file

/**
 * @desc    Create a new DSR
 * @route   POST /api/dsr
 * @access  Public // Change to Private if you have auth
 */
const createDsr = async (req, res) => {
  try {
    const {
      email,
      date,
      attachment,
      projectName,
      projectDescription,
      todoTasks,
    } = req.body;

    // Basic validation
    if (
      !email ||
      !date ||
      !attachment ||
      !projectName ||
      !projectDescription ||
      !todoTasks
    ) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newDsr = await Dsr.create({
      email,
      date,
      attachment,
      projectName,
      projectDescription,
      todoTasks,
    });

    res.status(201).json(newDsr);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

/**
 * @desc    Get all DSRs
 * @route   GET /api/dsr
 * @access  Public
 */
const getAllDsrs = async (req, res) => {
  try {
    const dsrs = await Dsr.find({}).sort({ createdAt: -1 }); // Get all, sorted by creation date
    res.status(200).json(dsrs);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

/**
 * @desc    Get a single DSR by ID
 * @route   GET /api/dsr/:id
 * @access  Public
 */
const getDsrById = async (req, res) => {
  try {
    const dsr = await Dsr.findById(req.params.id);

    if (!dsr) {
      return res.status(404).json({ message: "DSR not found." });
    }

    res.status(200).json(dsr);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

/**
   Update a DSR
   PUT /api/dsr/:id
  Public
 */
const updateDsr = async (req, res) => {
  try {
    const dsr = await Dsr.findById(req.params.id);

    if (!dsr) {
      return res.status(404).json({ message: "DSR not found." });
    }

    const updatedDsr = await Dsr.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update respects schema validation
    });

    res.status(200).json(updatedDsr);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};


const deleteDsr = async (req, res) => {
  try {
    const dsr = await Dsr.findById(req.params.id);

    if (!dsr) {
      return res.status(404).json({ message: "DSR not found." });
    }

    await Dsr.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "DSR deleted successfully.", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};


module.exports = {
  createDsr,
  getAllDsrs,
  getDsrById,
  updateDsr,
  deleteDsr,
};