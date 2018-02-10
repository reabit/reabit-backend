const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserReadingList = new Schema({
  idUser: {
    type: String
  },
  title: {
    type: String,
    required: [true,'Title Is Required']
  },
  author: {
    type: String,
    required: [true,'Title Is Author']
  },
  category: {
    type: String,
    required: [true,'Category Is Required']
  },
  description: {
    type: String
  },
  article: [String],
  link: {
    type: String,
    required: [true,'Link Is Required']
  },
  img: {
    type: String,
    required: [true,'Img Is Required']
  },
  statusRead: {
    type: Boolean,
    default: false
  },
  statusSummary: {
    type: Boolean,
    default: false
  }
}, { timestamps: {} } );

const Readings = mongoose.model('Readings', UserReadingList);

module.exports = Readings;
