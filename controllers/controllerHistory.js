const request = require('request');
const HttpStatus = require('http-status-codes')
const Readings = require('../models/readingListModels');
const Summarys = require('../models/summaryModels');

const getDataAlreadyRead = (req, res) => {
  console.log('test')
  let idUser = req.params.idUser
  console.log(idUser, 'from category')
  Readings.find({ idUser: idUser, statusRead: true })
  .then(result => {
    res.status(200).json({
      data: result
    })
  })
}

const countDataSummary = (req, res) => {
  let idUser = req.params.idUser
  Summarys.find({ idUser: idUser})
  .then(result => {
    res.status(200).json({
      data: result
    })
  })
}

module.exports = {
  getDataAlreadyRead,
  countDataSummary
}
