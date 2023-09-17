/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing user authentication
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       description: User credentials for logging in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid input or error during login
 *       '401':
 *         description: Unauthorized - Invalid credentials
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 */
router.post("/logout", userController.logoutUser);

module.exports = router;
