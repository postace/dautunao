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
  ERR_SERVER: {
    code: 5000,
    message: "Internal Server Error",
    httpStatus: 500
  }
};

exports.ErrorCode = ErrorCode;
