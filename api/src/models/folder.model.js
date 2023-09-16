"use strict";
var connection = require("../../config/db.config");

var Folder = function (folder) {
  this.id = folder.id;
  this.name = folder.name;
  this.user_id = folder.user_id;
};

Folder.findAll = function (result) {
  connection.query("SELECT * from Folder", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("folders : ", res);
      result(null, res);
    }
  });
};

module.exports = Folder;