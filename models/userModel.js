const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  img: {
    type: String
  }
});

const Users = mongoose.model('Users', userModel);

module.exports = Users;