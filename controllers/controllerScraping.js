const request = require('request');
const cheerio = require('cheerio');
const HttpStatus = require('http-status-codes')

const listReadingScraping = (req, res) => {
  let category = req.body.category
  let url = `https://medium.com/tag/${category}`;
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let listArticles = [];
        $('div.streamItem').each(function(i, elementStream){ 
          let title = $(this).find('h3.graf').text();

          const metadata = {
            title: title,
            url: ''
          };
          listArticles.push(metadata); 
        });
        $('div.postArticle-readMore a.button').each(function(k, elementUrl){
          listArticles[k].url = $(this).attr('href');
        });
        res.status(HttpStatus.OK).json({
          messages: 'List Categories',
          category: req.body.category,
          data: listArticles
        })
    }else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: 'List Categories Error',
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      })
    }
  })
}

module.exports = {
  listReadingScraping
}