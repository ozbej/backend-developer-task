"use strict";
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "notes_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});
module.exports = connection;
