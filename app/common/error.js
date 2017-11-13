'use strict';

exports.BaseError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

require('util').inherits(exports.BaseError, Error);

