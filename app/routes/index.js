'use strict';

const router = require('express').Router();
const { version } = require('../../package.json');

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.json({
    serviceName: 'DauTuNao',
    version: version
  });
});

router.use('/', userController);

module.exports = router;
