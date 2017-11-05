"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
  customerId: String,
  userId: String,
  customerName: String,
  email: String,
  username: String,
  registerStatus: String
});

module.exports = mongoose.model("User", User);
