/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 */

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

/**
 * @swagger
 * components:
 *  schemas:
 *    NoteText:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        folder_id:
 *          type: integer
 *        note_visibility:
 *          type: string
 *          enum: ["shared", "private"]
 *        note_type:
 *          type: string
 *          enum: ["text"]
 *        body:
 *          type: string
 *    NoteList:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       folder_id:
 *         type: integer
 *       note_visibility:
 *         type: string
 *         enum: ["private", "public"]
 *       note_type:
 *         type: string
 *         enum: ["list"]
 *       list_items:
 *         type: array
 *         items:
 *           type: string
 *    NoteTextNoId:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        folder_id:
 *          type: integer
 *        note_visibility:
 *          type: string
 *          enum: ["private", "public"]
 *        note_type:
 *          type: string
 *          enum: ["text"]
 *        body:
 *          type: string
 *    NoteListNoId:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       folder_id:
 *         type: integer
 *       note_visibility:
 *         type: string
 *         enum: ["private", "public"]
 *       note_type:
 *         type: string
 *         enum: ["list"]
 *       list_items:
 *         type: array
 *         items:
 *           type: string
 *    Note:
 *     oneOf:
 *       - $ref: '#/components/schemas/NoteText'
 *       - $ref: '#/components/schemas/NoteList'
 *    NoteNoId:
 *     oneOf:
 *       - $ref: '#/components/schemas/NoteTextNoId'
 *       - $ref: '#/components/schemas/NoteListNoId'
 */

/**
 * @swagger
 * /api/notes/:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       description: Note object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteNoId'
 *     responses:
 *       '200':
 *         description: Note created successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.post("/", noteController.create);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: sortVisibility
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort order for the notes list by visibility
 *       - in: query
 *         name: sortHeading
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort order for the notes list by header (name)
 *       - in: query
 *         name: filterFolder
 *         description: Filter notes by folder_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: filterVisibility
 *         schema:
 *           type: string
 *           enum:
 *             - shared
 *             - private
 *         description: Filter notes by visibility
 *       - in: query
 *         name: filterNoteText
 *         description: Filter notes by note text
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/", noteController.findAll);
/**
 * @swagger
 * /api/notes/text:
 *   get:
 *     summary: Get all notes text
 *     tags: [Notes]
 *     responses:
 *       '200':
 *         description: List of notes text
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/text", noteController.findText);

/**
 * @swagger
 * /api/notes/listItems:
 *   get:
 *     summary: Get all list items
 *     tags: [Notes]
 *     responses:
 *       '200':
 *         description: List of list items
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.get("/listItems", noteController.findListItems);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated note object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteNoId'
 *     responses:
 *       '200':
 *         description: Folder updated successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.put("/:id", noteController.update);

/**
 * @swagger
 * /api/notes/text/{id}:
 *   put:
 *     summary: Update note text by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note text to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated note text object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               note_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Note text updated successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.put("/text/:id", noteController.updateText);

/**
 * @swagger
 * /api/notes/listItems/{id}:
 *   put:
 *     summary: Update note list item by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note list item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated note list item object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               note_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Note list item updated successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.put("/listItems/:id", noteController.updateListItem);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note and belonging text by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.delete("/:id", noteController.delete);

module.exports = router;
