'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./app/routes/index');
const { extractUserInfo } = require('./app/middleware/authMiddleware');

require('dotenv').load();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// use morgan to log requests to the console
app.use(morgan(process.env.MORGAN_FORMAT || 'dev'));
app.use(extractUserInfo);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = Promise;

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
