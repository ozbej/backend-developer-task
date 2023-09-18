"use strict";
let connection = require("../../config/db.config");

const Folder = function (folder) {
  this.id = folder.id;
  this.name = folder.name;
  this.user_id = folder.user_id;
};

Folder.create = function (newFolder, result) {
  connection.query("INSERT INTO Folder SET ?", newFolder, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Folder.findAll = function (result) {
  connection.query("SELECT * FROM Folder", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Folder.findById = function (id, result) {
  connection.query(
    "SELECT * FROM Folder WHERE id = ? ",
    id,
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

Folder.findByUserId = function (id, result) {
  connection.query(
    "SELECT * FROM Folder WHERE user_id = ? ",
    id,
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

Folder.update = function (id, folder, result) {
  connection.query(
    "UPDATE Folder SET name=?,user_id=? WHERE id = ?",
    [folder.name, folder.user_id, id],
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

Folder.delete = function (id, result) {
  connection.query("DELETE FROM Folder WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Folder;
