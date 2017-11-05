"use strict";

const router = require("express").Router();
const userService = require("../services/userService");
const utils = require("../utils/util");

/**
 * First time register a user
 */
router.post("/api/users/register", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  }

  userService
    .registerNewUser(req.userInfo)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err);

      res.status(500).json({
        message: "Internal Server Error. Please try again"
      });
    });
});

/**
 * Save user info (name, mail, phone)
 */
router.post("/api/free_user", (req, res) => {
  userService
    .saveFreeUser(req.body)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err);

      res.status(500).json({
        message: "Internal Server Error. Please try again"
      });
    });
});

module.exports = router;
