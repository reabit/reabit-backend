const request = require('request');
const cheerio = require('cheerio');

const listReadingScraping = (req, res) => {
  let category = 'technology';
  let url = `https://medium.com/tag/${category}`;
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let listArticles = [];
        $('div.streamItem').each(function(i, elementStream){ 
          let title = $(this).find('h3.graf').text();
          // let figure = $(this).find('figure.graf');
          // let aspectRatioPlaceholder = figure.find('div.aspectRatioPlaceholder')
          // let aspectRatioPlaceholderfill = aspectRatioPlaceholder.next().find('img.progressiveMedia-canvas')
          // console.log(aspectRatioPlaceholderfill.length)

          const metadata = {
            title: title,
            url: ''
          };
          listArticles.push(metadata); 
        });
        // $('div.progressiveMedia img.progressiveMedia-image').each(function(j, elementImg){
        //   listArticles[j].img = $(this).attr('src');
        // });
        $('div.postArticle-readMore a.button').each(function(k, elementUrl){
          listArticles[k].url = $(this).attr('href');
        });
        res.status(200).json({
          listArticles
        })
    }
  })
}

module.exports = {
  listReadingScraping
}