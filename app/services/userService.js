"use strict";

let { User, FreeUser } = require("../models/user");
let InvestmentPortfolio = require("../models/investment");
const { REGISTER_STATUS } = require("../utils/userUtil");
const ErrorCode = require("../common/error").ErrorCode;
const userDao = require("../dao/userDao");

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
        console.log(err.message);
        if (err.code === 11000) {
          reject(ErrorCode.ERR_USER_EXIST);
        } else {
          reject(ErrorCode.ERR_SERVER);
        }
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

exports.getUserInfo = userToken => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        customerId: userToken.customerId
      },
      (err, res) => {
        if (err) {
          reject(err);
        }
        // User not register, we return their info with register status is NotRegistered
        if (!res) {
          res = userToken;
          res.registerStatus = REGISTER_STATUS.NotRegistered;
        }

        resolve(res);
      }
    );
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
      });
    });
  });
};

exports.getWaitlist = () => {
  return new Promise((resolve, reject) => {
    let waitlist = [];
    userDao
      .findAllByStatus(REGISTER_STATUS.PendingServiceDesk)
      .then(pendingUsers => {
        pendingUsers.forEach(user => {
          let { customerId, customerName, email, phoneNumber } = user;
          waitlist.push({ customerId, customerName, email, phoneNumber });
        });

        userDao.findAllFreeUser().then(freeUsers => {
          freeUsers.forEach(freeUser => waitlist.push(freeUser));
          resolve(waitlist);
        });
      })
      .catch(err => reject(ErrorCode.ERR_SERVER));
  });
};

exports.confirmOrCancelServiceDesk = (customerId, callStatus) => {
  // TODO: Check for user exist
  return new Promise((resolve, reject) => {
    User.findOne({ customerId: customerId })
      .then(user => {
        if (user.registerStatus === REGISTER_STATUS.PendingServiceDesk) {
          callStatus = callStatus.toUpperCase();

          switch (callStatus) {
            case "CONFIRMED":
              // User confirmed service desk call, now they'll wait for signing contract
              user.registerStatus = REGISTER_STATUS.PendingContract;
              break;
            case "CANCELED":
              user.registerStatus = REGISTER_STATUS.CanceledServiceDesk;
              break;
            default:
              reject(ErrorCode.ERR_STATUS_CANNOT_UNDERSTAND);
          }

          return user.save();
        } else {
          reject(ErrorCode.ERR_CANNOT_CHANGE_STATUS);
        }
      })
      .then(() => resolve())
      .catch(err => reject(ErrorCode.ERR_USER_NOT_FOUND));
  });
};
