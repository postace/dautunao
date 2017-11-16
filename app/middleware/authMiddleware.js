'use strict';

const userUtil = require('../utils/userUtil');

exports.extractUserInfo = (req, res, next) => {
  let accessToken = req.headers['authorization'];

  if (accessToken) {
    let userInfo = userUtil.extractUserInfoFromToken(accessToken);
    
    req.userInfo = userInfo;
  } 

  next();
};
