"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
  customerId: String,
  userId: String,
  customerName: String,
  email: String,
  username: String,
  tradingExp: Number,
  status: String,
  registerStatus: String
});

let FreeUser = new Schema({
  fullName: String,
  email: String,
  phoneNumber: String
});

exports.User = mongoose.model("User", User);

exports.FreeUser = mongoose.model("FreeUser", FreeUser);
