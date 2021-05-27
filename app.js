require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') { app.use(logger('dev')); }

app.use(require('./server/index'));

module.exports = app;