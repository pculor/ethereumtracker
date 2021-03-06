const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('../config/winston');
const { handleResponse, OK } = require('../utils/success');
const customErrorHandler = require('../middleware/customErrorHandler');
const routes = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('combined', { stream: winston.stream }));
app.use(helmet());

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(
    `${err.message || 500} - ${err.message} -
        ${req.originalUrl} -
        ${req.method} - ${req.ip}`,
  );

  res.status(err.status || 500);
  res.render('error');
  next();
});

app.use('/api/v1', routes);

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.get('/api', (req, res) => {
  handleResponse(res, OK, 'Ethereum tracker app is up');
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid route!',
  });
});

app.use(customErrorHandler());
module.exports = app;
