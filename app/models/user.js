"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  userId: String,
  customerName: String,
  email: String,
  username: String,
  tradingExp: Number,
  status: String,
  registerStatus: String,
  roles: String,
  accountType: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  subAccounts: [{ accountName: String, _id: false }],
  _id: String
});

User.pre('save', function (next) {
  this._id = this.customerId;
  next();
});

let FreeUser = new Schema({
  customerName: String,
  email: String,
  phoneNumber: String
});

exports.User = mongoose.model("User", User);

exports.FreeUser = mongoose.model("FreeUser", FreeUser);
