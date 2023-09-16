"use strict";
var connection = require("../../config/db.config");

var User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.username = user.username;
  this.password = user.password;
};

User.getOneUser = function (username, result) {
  connection.query(
    "SELECT * FROM User WHERE username = ? ",
    username,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
