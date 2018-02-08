const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
  title: String,
  article: String,
  url: String,
  categories: [String],
  readingStatus: {
    type: Boolean,
    
  },


}, { timestamps : {} })

module.exports = mongoose.model('Movies', movieSchema)