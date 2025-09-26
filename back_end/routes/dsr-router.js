// const express = require("express");
// const { addDsr, getDsr, deleteDsr, updateDsr, getDsrById } = require("../controller/DsrController");
// const {protect} = require("../middleware/authMiddleware");

// const router = express.Router();
// // Add new dsr (Protected)
// router.post("/create", protect, addDsr);
// // NEW: Get all 
// router.get("/", protect, getDsr);
// // get single dsr 
// router.get("/:id",protect, getDsrById);
// // delete dsr 
// router.delete("/delete/:id", protect, deleteDsr);
// // update dsr 
// router.put("/update/:id", protect, updateDsr);




// module.exports = router;


const express = require("express");
const {
  addDsr,
  getDsr,
  deleteDsr,
  updateDsr,
  getDsrById,
} = require("../controller/DsrController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); 

const router = express.Router();

// Add new dsr (Protected + File Upload)
router.post("/create", protect, upload.single("attachment"), addDsr);

// Get all dsr
router.get("/", protect, getDsr);

// Get single dsr
router.get("/:id", protect, getDsrById);

// Delete dsr
router.delete("/delete/:id", protect, deleteDsr);

// Update dsr (Protected + File Upload)
router.put("/update/:id", protect, upload.single("attachment"), updateDsr);

module.exports = router;
