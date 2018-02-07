const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReadingList = new Schema({
  idUser: {
    type: String
  },
  title: {
    type: String,
    required: [true,'Title Is Require']
  },
  author: {
    type: String,
    required: [true,'Title Is Author']
  },
  category: {
    type: String,
    required: [true,'Category Is Require']
  },
  description: {
    type: String
  },
  article: [String],
  link: {
    type: String,
    required: [true,'Link Is Require']
  },
  img: {
    type: String,
    required: [true,'Img Is Require']
  },
  date: {
    type: Date,
    default: Date.now
  },
  statusRead: {
    type: Boolean,
    default: false
  }
});

const Readings = mongoose.model('Readings', UserReadingList);

module.exports = Readings;
