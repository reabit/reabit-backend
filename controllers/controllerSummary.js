const SummaryTools = require('node-tldr');

const Readings = require('../models/readingListModels');
const Summarys = require('../models/summaryModels');

const listSummaryArticle = (req, res) => {
  Summarys.find({
    idUser: '1'
  }).then((respones) => {
    res.status(200).json({
      data: respones
    })
  })
  .catch(err => console.log(err))
}

const addSummaryArticle = (req, res) => {
  let summaryUser = req.body.summary;
  Readings.findById(req.params.id)
    .then((data) => {
      let url = data.link;
      SummaryTools.summarize(url, function(title, summary, failure) {
          if (failure) {
              console.log("An error occured! " + error);
          }
          let newSummary = new Summarys({
            idUser: '1',
            idReading: req.params.id,
            summaryArticle: title.summary.join(' '),
            summaryUser: summaryUser
          })
          newSummary.save()
           .then((data) => {
            res.status(200).json({
              data: data
            })
           })
           .catch(err => console.log(err))
      });
    })
    .catch(err => console.log(err))
}

const editSummaryArticle = (req, res) => {
  let summaryUser = {
    summaryUser: req.body.summary
  };
  Summarys.findOneAndUpdate({
    _id: req.params.id
  }, summaryUser)
    .then(() => {
      res.status(200).json({
        msg: 'Update Sukses'
      })
    })
    .catch(err => console.log(err))
}

module.exports = {
  listSummaryArticle,
  addSummaryArticle,
  editSummaryArticle
}