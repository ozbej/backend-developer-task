"use strict";

const Folder = require("../models/folder.model");

exports.create = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    if (!req.body.name) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    }

    req.body.user_id = req.session.userData.id; // Add user id
    const newFolder = new Folder(req.body);
    Folder.create(newFolder, function (err, folder) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Folder created successfully!",
        data: folder,
      });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.findAll = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    Folder.findAll(function (err, folder) {
      if (err) res.send(err);
      res.send(folder);
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.findById = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    Folder.findById(req.params.id, function (err, folder) {
      if (err) res.send(err);
      res.json(folder);
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.findByUserId = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    Folder.findByUserId(req.params.id, function (err, folder) {
      if (err) res.send(err);
      res.json(folder);
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.update = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(401).json({ message: "Log in to perform this action" });

    if (!req.body.name) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    }
    Folder.update(req.params.id, new Folder(req.body), function (err, folder) {
      if (err) res.send(err);
      res.json({ error: false, message: "Folder successfully updated" });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.delete = function (req, res) {
  try {
    Folder.delete(req.params.id, function (err, folder) {
      if (err) res.send(err);
      res.json({ error: false, message: "Folder successfully deleted" });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};
