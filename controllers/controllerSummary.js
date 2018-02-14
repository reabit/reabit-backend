const stringSimilarity = require('string-similarity');
const Readings = require('../models/readingListModels');
const Summarys = require('../models/summaryModels');
const unirest = require('unirest')
const { detectLanguage, translateLanguage } = require('../helpers/translation')

const listSummaryArticle = (req, res) => {
  console.log(req.decoded._id)
  Summarys.find({
    idUser: req.decoded._id
  })
  .then((respones) => {
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
      let text = data.article.join('')
      console.log(text, '------------------> data article in db')
      unirest.post('https://textanalysis-text-summarization.p.mashape.com/text-summarizer')
      .headers({
        'X-Mashape-Authorization': process.env.TEXT_SUMMARIZATION,
        'Content-Type': 'application/json'
      })
      .send(`{"url":"", "text":"${text}", "sentnum" : 8}`)
      .end(function (response) {
        let resultSummary = response.body.sentences.join('')
        console.log(resultSummary,' ===================================> summary system')
        Promise.all([
          translateLanguage(resultSummary),
          translateLanguage(summaryUser)
        ])
        .then(resultTranslate => {
          console.log(resultTranslate, '---------------------------------------> result translate')
          let compareSummary = stringSimilarity.compareTwoStrings(resultTranslate[0], resultTranslate[1]) > 0.5 ? true : false
          let numberCompareSummary = stringSimilarity.compareTwoStrings(resultTranslate[0], resultTranslate[1])
          let newSummary = new Summarys({
            idUser: req.decoded._id,
            idReading: req.params.id,
            summaryArticle: resultTranslate[0],
            summaryUser: summaryUser,
            similarity: compareSummary,
            numberSimilarity: numberCompareSummary
          })
          Promise.all([
            Readings.findByIdAndUpdate(req.params.id, {
              statusSummary: true
            }),
            newSummary.save()
          ])
          .then((data) => {
            res.status(200).json({
              data: data[1]
            })
          })
          .catch(err => console.log(err))          
        })
      })
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