const express = require("express");
const router = express.Router();

const {
  addDsr,
  getDsr,
  deleteDsr,
} = require("../controller/add-Dsr-Controller");

// ✅ Correct route setup
router.route("/dsr").post(addDsr).get(getDsr);

// ✅ Define delete route separately
router.delete("/dsr/:id", deleteDsr);

module.exports = router;
