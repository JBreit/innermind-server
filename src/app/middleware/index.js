const Promise = require('bluebird');
const User = require('../models/User');

const findByUsername = (username, callback) => {
  User.findOne({ username })
    .exec((err, user) => {
      if (err) {
        next(err);
      } else {
        req.user = user;
        return callback(null, req.user);
      }
    });
};
const getByUsername = (req, res, next) => {
  if (req.params.username) {
    findByUsername(req.params.username, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      return next();
    });
  }
  return next();
};
exports.getByUsername = getByUsername;
