'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./app/routes/index');

require('dotenv').load();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/', router);

app.use((req, res) => {
  res.status(404);
  res.json({ status: 'Not Found' });
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({ status: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DauTuNao is running on port ${port}`);
});
