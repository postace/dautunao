'use strict';

const express = require('express');

require('dotenv').load();

const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DauTuNao is running on port ${port}`);
});
