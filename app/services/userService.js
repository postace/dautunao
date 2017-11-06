"use strict";

let { User, FreeUser } = require("../models/user");
let InvestmentPortfolio = require("../models/investment");
const { REGISTER_STATUS } = require("../utils/userUtil");

exports.registerNewUser = userInfo => {
  return new Promise((resolve, reject) => {
    let newUser = new User({
      customerId: userInfo.customerId,
      userId: userInfo.userId,
      customerName: userInfo.customerName,
      email: userInfo.email,
      username: userInfo.username,
      tradingExp: userInfo.tradingExp,
      status: userInfo.status,
      registerStatus: REGISTER_STATUS.PendingServiceDesk
    });

    newUser.save(err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

exports.saveFreeUser = userReq => {
  return new Promise((resolve, reject) => {
    let user = new FreeUser({
      fullName: userReq.fullName,
      email: userReq.email,
      phoneNumber: userReq.phoneNumber
    });

    user.save(err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

exports.registerInvestment = (customerId, investmentData) => {
  return new Promise((resolve, reject) => {
    let investmentPortfolio = new InvestmentPortfolio({
      customerId: customerId,
      subAccount: investmentData.subAccount,
      investmentPurpose: investmentData.investmentPurpose,
      investTime: investmentData.investTime,
      goal: investmentData.goal,
      riskLevel: investmentData.riskLevel,
      category: investmentData.category,
      categoryName: investmentData.categoryName
    });
    
    investmentPortfolio.save(err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};
