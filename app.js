require('dotenv').config();

const debug = require('debug')('automation:Middleware');

require('./config/config');
const express = require('express');

require('./dbConection');
const sendErrorMessage = require('./error_handler/error_handler');

const app = express();
require('express-async-errors');

const port = global.gConfig.node_port;

const router = require('./router/route');
const UrlNotFoundError = require('./error_handler/error/UrlNotFoundError');

app.use(express.json());

app.use('/api', router(express.Router()));

app.use((req, res, next) => {
  throw new UrlNotFoundError();
});

app.use((err, req, res, next) => {
  if (err) {
    sendErrorMessage(req, res, err);
  }
});

app.listen(port, () => {
  debug(`Server listening on port ${port}`);
});
