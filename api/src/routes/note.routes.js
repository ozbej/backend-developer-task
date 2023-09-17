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
 * /api/notes/text:
 *   post:
 *     summary: Create a new note of type text
 *     tags: [Notes]
 *     requestBody:
 *       description: Note object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteTextNoId'
 *     responses:
 *       '200':
 *         description: Note created successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.post("/text", noteController.createText);

/**
 * @swagger
 * /api/notes/list:
 *   post:
 *     summary: Create a new note of type list
 *     tags: [Notes]
 *     requestBody:
 *       description: Note object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteListNoId'
 *     responses:
 *       '200':
 *         description: Note created successfully
 *       '400':
 *         description: Invalid input or error during request
 *       '401':
 *         description: Not logged in
 */
router.post("/list", noteController.createList);

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
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note by ID
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
