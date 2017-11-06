"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InvestmentPortfolio = new Schema({
  customerId: String,
  subAccount: String,
  investmentPurpose: String,
  investTime: Number,
  goal: String,
  riskLevel: String,
  categoryName: String,
  category: [{ stockCode: String, proportion: Number, _id: false }],
});

/* Set customerId as unique id */
InvestmentPortfolio.pre('save', next => {
  let self = this;

  this._id = this.customerId;

  next();
});

module.exports = mongoose.model("InvestmentPortfolio", InvestmentPortfolio);
