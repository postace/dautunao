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
      roles: userInfo.roles,
      accountType: userInfo.accountType,
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

exports.getInvestmentPortfolio = (customerId, subAccount) => {
  return new Promise((resolve, reject) => { 
    InvestmentPortfolio.find({ subAccount: subAccount }, (err, doc) => {
      if (err) {
        reject(err);
      }

      resolve(doc);
    })
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

exports.getUserInfo = customerId => {
  return new Promise((resolve, reject) => { 
    // find user by their's customerId
    User.findOne({
      customerId: customerId
    }, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
};

exports.createSubAccount = (customerId, accountName) => {
  return new Promise((resolve, reject) => { 
    // TODO: Check for user exist
    // TODO: Validate accountName unique, not empty
    User.findOne({ customerId: customerId }, (err, user) => {
      if (err) {
        reject(err);
      }

      user.subAccounts.push({ accountName: accountName });
      user.save(err => {
        if (err) {
          reject(err);
        }

        resolve();
      })
    })
  });
}
