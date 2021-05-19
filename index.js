const server = require('./src/server');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => {
    console.log('CONNECTION_ERROR', e.message);
  });
  
  