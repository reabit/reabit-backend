const googleTranslate = require('google-translate')(process.env.API_GOOGLE);

const detectLanguage = (text) => {
  return new Promise((resolve, reject) => {
    googleTranslate.detectLanguage(text, function (err, detection) {
      if(!err) resolve(detection.language)
      reject(err)
    })
    
  })
}

const translateLanguage = (text) => {
  return new Promise((resolve, reject) => {
    detectLanguage(text)
    .then(result => {
      if(result == 'id'){
        resolve(text)
      }else{
        googleTranslate.translate(text, 'id', function (err, translation) {
          if(!err) resolve(translation.translatedText)
          reject(err)
        })
      }
    })
  })
}

module.exports = {
  detectLanguage,
  translateLanguage
}