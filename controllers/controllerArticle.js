const request = require('request')
const cheerio = require('cheerio')

const Readings = require('../models/readingListModels')

const setReadingList = (req, res) => {
  // console.log('from controller')
  let indexParamsSource = req.body.url.indexOf('?source=-')
  let url = req.body.url.substring(0, indexParamsSource)
  Readings.findOne({
    link: url,
    idUser: req.decoded.email
  }).then(result => {
    // console.log(result)
    if (result) {
      res.status(200).json({
        data: result
      })
    } else {
      request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html)
          let title = $('div.section-inner')
            .find('h1.graf')
            .text()
          let img = $('meta[property="og:image"]').attr('content')
          let description = $('meta[property="og:description"]').attr('content')
          let url = $('meta[property="og:url"]').attr('content')
          let author = $('meta[property="author"]').attr('content')
          const metadata = {
            title: title,
            description: description,
            url: url,
            author: author,
            img: img,
            text: []
          }

          $('div.section-inner p')
            .attr('class', '.graf')
            .each((i, elementP) => {
              metadata.text.push($(elementP).text())
            })
          let newReadins = new Readings({
            idUser: req.decoded._id,
            title: metadata.title,
            author: metadata.author,
            category: req.body.category,
            description: metadata.description,
            article: metadata.text,
            link: metadata.url,
            img: metadata.img
          })

          newReadins
            .save()
            .then(result => {
              res.status(200).json({
                data: result
              })
            })

            .catch(err => console.log(err))
        }
      })
    }
  })
}
const readingList = (req, res) => {
  // console.log(req.decoded)
  Readings.find({
    idUser: req.decoded._id
  })
    .then(response => {
      // console.log(response)
      res.status(200).json({
        data: response
      })
    })
    .catch(err => console.log(err))
}

const readingDetail = (req, res) => {
  let updateStatus = {
    statusRead: true
  }
  Readings.findOneAndUpdate(
    {
      _id: req.params.id
    },
    updateStatus
  )
    .then(data => {
      res.status(200).json({
        data: data
      })
    })
    .catch(err => console.log(err))
}

const readingDelete = (req, res) => {
  Readings.remove(
    {
      _id: req.params.id
    }
  )
    .then(data => {
      res.status(200).json({
        data: data
      })
    })
    .catch(err => console.log(err))
}

module.exports = {
  setReadingList,
  readingList,
  readingDetail,
  readingDelete
}
