"use strict";

const { FreeUser, User } = require('../models/user');
const { REGISTER_STATUS } = require("../utils/userUtil");

async function findAllByStatus(status) {
  return new Promise((resolve, reject) => { 
    User.find({ registerStatus: status }, (err, docs) => {
      if (err) {
        reject(err);
      }

      resolve(docs);
    });
  });
};

exports.findAllByStatus = findAllByStatus;

exports.findAllFreeUser = async () => {
  return new Promise((resolve, reject) => { 
    FreeUser.find({}, (err, docs) => {
      if (err) {
        reject(err);
      }

      resolve(docs);
    });
  });
};
