const express = require("express");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");
const app = express();

require("dotenv").config();

const database = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
