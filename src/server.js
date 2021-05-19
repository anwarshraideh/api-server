'use strict';

const express = require('express');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const foodRouter = require('./routes/food.js');
const clotheRouter = require('./routes/clothes.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use('/food', foodRouter);
app.use('/clothes', clotheRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
