'use strict';

exports.BaseError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

require('util').inherits(exports.BaseError, Error);

/**
 * Custom error code.
 * 
 * Each error code will contains: code, message, httpStatus
 */
const ErrorCode = {
  ERR_USER_EXIST: {
    code: 4000,
    message: "User is existed",
    httpStatus: 409
  },
  ERR_MISSING_CUSTID: {
    code: 4001,
    message: "Missing customerId",
    httpStatus: 400
  },
  ERR_MISSING_CALL_STATUS: {
    code: 4002,
    message: "Missing customerId",
    httpStatus: 422
  },
  ERR_USER_NOT_FOUND: {
    code: 4004,
    message: "User not found",
    httpStatus: 404
  },
  ERR_CANNOT_CHANGE_STATUS: {
    code: 4005,
    message: "Cannot change user register status",
    httpStatus: 403
  },
  ERR_STATUS_CANNOT_UNDERSTAND: {
    code: 4006,
    message: "Cannot understand service-desk call status",
    httpStatus: 400
  },
  ERR_SERVER: {
    code: 5000,
    message: "Internal Server Error",
    httpStatus: 500
  }
};

exports.ErrorCode = ErrorCode;
