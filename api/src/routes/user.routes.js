const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Get all folders
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
