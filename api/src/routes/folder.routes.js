const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder.controller");

router.post("/", folderController.create); // Create new folder
router.get("/", folderController.findAll); // Get all folders
router.get("/:id", folderController.findById); // Get folder by id
router.get("/user/:id", folderController.findByUserId); // Get folder by user id
router.put("/:id", folderController.update); // Update folder by id
router.delete("/:id", folderController.delete); // Delete folder by id

module.exports = router;
