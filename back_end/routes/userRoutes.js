const express = require("express");
const router = express.Router();
const {createUser,getUser,deleteUser} = require("../controller/user-controller");

// Existing routes
router.post("/create", createUser);
router.get("/all", getUser);

//  route for delete
router.delete("/delete/:id", deleteUser);

module.exports = router;


// checked