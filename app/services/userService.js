"use strict";

let User = require("../models/user");
const { REGISTER_STATUS } = require("../utils/userUtil");

exports.registerNewUser = userInfo => {
  return new Promise((resolve, reject) => {
    let newUser = new User({
      customerId: userInfo.customerId,
      userId: userInfo.userId,
      customerName: userInfo.customerName,
      email: userInfo.email,
      username: userInfo.username,
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
