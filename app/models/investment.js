"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InvestmentPortfolio = new Schema({
  customerId: String,
  subAccount: {
    type: String,
    required: true,
    unique: true
  },
  investmentPurpose: String,
  investTime: Number,
  goal: String,
  riskLevel: String,
  categoryName: String,
  category: [{ stockCode: String, proportion: Number, _id: false }],
  _id: String
});

InvestmentPortfolio.pre('save', function (next) {
  this._id = this.customerId;
  next();
});

module.exports = mongoose.model("InvestmentPortfolio", InvestmentPortfolio);
