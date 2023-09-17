/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: API endpoints for managing folders
 */

const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Folder:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         user_id:
 *           type: integer
 */

/**
 * @swagger
 * /api/folders:
 *   post:
 *     summary: Create a new folder
 *     tags: [Folders]
 *     requestBody:
 *       description: Folder object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Folder created successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.post("/", folderController.create);

/**
 * @swagger
 * /api/folders:
 *   get:
 *     summary: Get all folders
 *     tags: [Folders]
 *     responses:
 *       '200':
 *         description: List of folders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Folder'
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/", folderController.findAll);

/**
 * @swagger
 * /api/folders/{id}:
 *   get:
 *     summary: Get folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the folder to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Folder retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folder'
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/:id", folderController.findById);

/**
 * @swagger
 * /api/folders/user/{id}:
 *   get:
 *     summary: Get folders by user ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve folders for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of folders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Folder'
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/user/:id", folderController.findByUserId);

/**
 * @swagger
 * /api/folders/{id}:
 *   put:
 *     summary: Update folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the folder to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated folder object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Folder updated successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.put("/:id", folderController.update);

/**
 * @swagger
 * /api/folders/{id}:
 *   delete:
 *     summary: Delete folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the folder to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Folder deleted successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.delete("/:id", folderController.delete);

module.exports = router;
