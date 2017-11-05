'use strict';

const router = require('express').Router();
const { version } = require('../../package.json');

router.get('/', (req, res) => {
  res.json({
    serviceName: 'DauTuNao',
    version: version
  });
});

module.exports = router;
