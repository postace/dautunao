"use strict";

const REGISTER_STATUS = {
  NotRegistered: "NotRegistered",
  PendingServiceDesk: "PendingServiceDesk",
  CanceledServiceDesk: "CanceledServiceDesk",
  PendingContract: "PendingContract",
  SignedContract: "SignedContract"
};

exports.REGISTER_STATUS = REGISTER_STATUS;

module.exports.extractUserInfoFromToken = base64Token => {
  let [b64Algorithm, b64Payload, b64Signature] = base64Token.split(".");
  let buffer = new Buffer(b64Payload, "base64");

  return JSON.parse(buffer.toString());
};
