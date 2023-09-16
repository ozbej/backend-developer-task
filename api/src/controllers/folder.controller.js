"use strict";

const Folder = require("../models/folder.model");

exports.findAll = function (req, res) {
  try {
    Folder.findAll(function (err, folder) {
      if (err) res.send(err);
      res.send(folder);
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};
