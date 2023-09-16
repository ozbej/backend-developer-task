"use strict";

const Folder = require("../models/folder.model");

exports.findAll = function (req, res) {
  Folder.findAll(function (err, folder) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", folder);
    res.send(folder);
  });
};
