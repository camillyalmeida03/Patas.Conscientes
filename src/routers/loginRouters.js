const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginControllers");

router.post("/", loginController.Login);
router.post("/ong", loginController.LoginOng);


module.exports = router;
