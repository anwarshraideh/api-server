'use strict';

module.exports = (req, res, next) => {
  console.log(`#REQUEST#: method:${req.method} Path:${req.path}`);
  next();
};
