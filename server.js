'use strict';

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').load();
const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DauTuNao is running on port ${port}`);
});
