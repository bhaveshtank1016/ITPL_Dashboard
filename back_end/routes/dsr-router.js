const express = require("express");
const { addDsr, getDsr, deleteDsr, updateDsr, getDsrById } = require("../controller/DsrController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/dsr", protect, addDsr);
router.get("/dsr", protect, getDsr);
router.delete("/dsr/:id", protect, deleteDsr);
router.put("/dsr/:id", protect, updateDsr);
router.get("/dsr/:id",protect, getDsrById);




module.exports = router;
