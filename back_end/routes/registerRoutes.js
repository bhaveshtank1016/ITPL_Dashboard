const express = require("express");
const router = express.Router()
const {registerUser, getAuser} = require("../controller/register-controller");

router.post("/register",registerUser);
router.get("/user",getAuser);

module.exports = router;


// checked working 