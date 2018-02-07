const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaSummary = new Schema({
  idUser: {
    type: String
  },
  idReading: {
    type: Schema.Types.ObjectId,
    ref: 'Readings'
  },
  summaryArticle: {
    type: String,
    required: [true,'Summary Articles Is Require']
  },
  summaryUser: {
    type: String,
    required: [true,'Summary User Is Require']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Summarys = mongoose.model('Summarys', schemaSummary);

module.exports = Summarys;
