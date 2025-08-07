const express = require("express");
const router = express.Router();

const {
  addDsr,
  getDsr,
  deleteDsr,
  updateDsr,
} = require("../controller/DsrController");

// ✅ Correct route setup
router.route("/dsr").post(addDsr).get(getDsr);

// ✅ Define delete route separately
router.delete("/dsr/:id", deleteDsr);

//update route
router.put("/dsr/:id", updateDsr);

module.exports = router;
