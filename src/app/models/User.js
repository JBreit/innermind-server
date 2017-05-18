const crypto = require('crypto');

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model('User', schema);

schema.methods.generateHash = (password) => {
  crypto.createHash('sha256').update(password).digest('base64').toString();
};
module.exports = User;
