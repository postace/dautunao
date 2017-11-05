'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').load();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DauTuNao is running on port ${port}`);
});
