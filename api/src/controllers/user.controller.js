"use strict";

const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

exports.loginUser = function (req, res) {
  try {
    if (req.session.isLoggedIn)
      return res.status(400).json({ message: "Already logged in" });

    if (
      req.body.username === undefined ||
      req.body.password === undefined ||
      Object.keys(req.body).length !== 2
    )
      return res
        .status(400)
        .json({ message: "Please provide both username and password" });

    User.getOneUser(req.body.username, function (err, user) {
      if (err) return res.send(err?.code ? err.code : err);

      if (user === undefined || user.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (err)
            return res
              .status(400)
              .json({ message: "Error comparing passwords" });

          if (result === true) {
            req.session.isLoggedIn = true;
            req.session.userData = {
              id: user[0].id,
              username: user[0].username,
            };
            return res.status(200).json({
              message: `User logged in successfully. Welcome ${user[0].username}!`,
            });
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        }
      );
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.logoutUser = function (req, res) {
  try {
    if (!req.session.isLoggedIn)
      return res.status(400).json({ message: "Already logged out" });

    const username = req.session.userData.username;
    req.session.isLoggedIn = false;
    req.session.userData = {};
    return res.status(200).json({
      message: `User logged out successfully. Bye ${username}!`,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
