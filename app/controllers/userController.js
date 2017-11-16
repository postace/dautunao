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
  } else {
    userService
      .registerNewUser(req.userInfo)
      .then(() => return201Success(res))
      .catch(error => {
        res.status(error.httpStatus).json(error);
      });
  }
});

/**
 * Save user info (name, mail, phone)
 */
router.post("/api/free_user", (req, res) => {
  userService
    .saveFreeUser(req.body)
    .then(() => return201Success(res))
    .catch(err => {
      console.log(err);

      res.status(500).json({
        message: "Internal Server Error. Please try again"
      });
    });
});

/**
 * Get sub-account investment portfolio
 * 
 */
router.get("/api/users/investment", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  } else {
    let customerId = req.userInfo.customerId;
    let subAccount = req.query.subAccount;

    userService
      .getInvestmentPortfolio(customerId, subAccount)
      .then(doc => res.json(doc))
      .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Investment portfolio not found" });
      });
  }
});

/**
 * Sign up user for investment portfolio
 */
router.post("/api/users/investment", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  } else {
    let investmentData = req.body;
    let customerId = req.userInfo.customerId;

    userService
      .registerInvestment(customerId, investmentData)
      .then(() => return201Success(res))
      .catch(err => {
        console.log("Save investment error", err);

        res.status(500).json({
          message: "Internal Server Error. Please try again"
        });
      });
  }
});

/**
 * Get user information
 */
router.get("/api/users/info", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  } else {
    userService
      .getUserInfo(req.userInfo)
      .then(data => res.json(data))
      .catch(err => {
        console.log("Get user error", err);

        res.status(404).json({
          message: "Cannot find this user"
        });
      });
  }
});

/**
 * Add sub-account for a user
 */
router.post("/api/users/sub_account", (req, res) => {
  if (!req.userInfo) {
    res.status(401).json({
      message: "Missing access token!"
    });
  } else {
    // TODO: Check for missing accountName in request body
    const customerId = req.userInfo.customerId;
    userService
      .createSubAccount(customerId, req.body.accountName)
      .then(() => return201Success(res))
      .catch(err => {
        console.log(err);

        res.status(500).json({
          message: "Something error! Please try again later"
        });
      });
  }
});

/**
 * Get all customer who is not being called by service desk
 */
router.get("/api/users/wait_list", (req, res) => {
  userService.getWaitlist()
  .then(waitlist => res.json(waitlist))
  .catch(error => res.status(error.httpStatus).json(error));
});

/**
 * Response to client with status 201 and code 'OK'
 * @param {*} response - the response object of the http method
 */
function return201Success(response) {
  return response.status(201).json({
    code: "OK"
  });
}

module.exports = router;
