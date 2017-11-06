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

/**
 * Sign up user for investment portfolio
 */
router.post("/api/users/investment", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  }
  let investmentData = req.body;
  let customerId = req.userInfo.customerId;

  userService
    .registerInvestment(customerId, investmentData)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log("Save investment error", err);

      res.status(500).json({
        message: "Internal Server Error. Please try again"
      });
    });
});

/**
 * Get user information
 */
router.get("/api/users/info", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  }

  userService
    .getUserInfo(req.userInfo.customerId)
    .then(data => res.json(data))
    .catch(err => {
      console.log("Get user error", err);

      res.status(404).json({
        message: "Cannot find this user"
      });
    });
});

module.exports = router;
