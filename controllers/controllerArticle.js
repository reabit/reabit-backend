const request = require('request');
const cheerio = require('cheerio');

const Readings = require('../models/readingListModels');

const setReadingList = (req, res) => {
  let url = req.body.url;
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
        let title = $('div.section-inner').find('h1.graf').text();
        let img = $('meta[property="og:image"]').attr('content');
        let description = $('meta[property="og:description"]').attr('content');
        let url = $('meta[property="og:url"]').attr('content');
        let author = $('meta[property="author"]').attr('content');
        const metadata = {
          title: title,
          description: description,
          url: url,
          author: author,
          img: img,
          text: []
        };

        $('div.section-inner p').attr('class','.graf').each((i, elementP) => {
          metadata.text.push($(elementP).text());
        })

        let newReadins = new Readings({
          idUser: '1',
          title: metadata.title,
          author: metadata.author,
          category: 'tecnology',
          description: metadata.description,
          article: metadata.text,
          link: metadata.url,
          img: metadata.img
        });

        newReadins.save()
         .then(() => {
          res.status(200).json({
            data: newReadins
          })
         })
         .catch(err => console.log(err))
    }
  })
}

const readingList = (req, res) => {
  Readings.find({
    idUser: req.params.id
  })
   .then((response) => {
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
  Readings.findOneAndUpdate({
    _id: req.params.id
  }, updateStatus)
   .then((data) => {
     res.status(200).json({
       data: data
     })
   })
   .catch(err => console.log(err))
}

module.exports = {
  setReadingList,
  readingList,
  readingDetail
}