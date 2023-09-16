const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder.controller");

// Get all folders
router.get("/", folderController.findAll);

module.exports = router;
