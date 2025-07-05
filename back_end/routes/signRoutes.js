const express = require("express");
const router = express.Router();
const { signIn, getuser, signUp } = require("../controller/sign-controller");

router.post("/signup", signUp);  
router.post("/sign", signIn);
router.get("/user", getuser);

module.exports = router;

// checked and add signup 