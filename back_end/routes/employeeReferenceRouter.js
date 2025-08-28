const express = require("express");
const upload = require("../middleware/upload");
const { protect ,authorizeRoles} = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createReference,
  getSingleEmpRef,
  getEmpRef,
  deleteEmpRef,
  updateEmpRef,
} = require("../controller/employeeReferenceController");

// create emp ref
router.post("/create",protect ,authorizeRoles("hr"), upload.single("file"), createReference);
// get all employee refernce 
router.get("/show",protect ,authorizeRoles("hr"), getEmpRef);
// get single id 
router.get("/:id",protect ,authorizeRoles("hr"), getSingleEmpRef);
// delete empref by id 
router.delete("/delete/:id",protect ,authorizeRoles("hr"), deleteEmpRef);
// update reference by id  

router.put("/update/:id",protect ,authorizeRoles("hr"), updateEmpRef);
module.exports = router;
