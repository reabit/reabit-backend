const googleTranslate = require('google-translate')(process.env.API_GOOGLE);

const detectLanguage = (text) => {
  googleTranslate.detectLanguage(text, function (err, detection) {
    return detection.language
  })
}

const translateLanguage = (text) => {
  googleTranslate.translate(text, 'en', function (err, translation) {
    return translation.translateText
  })
}

module.exports = {
  detectLanguage,
  translateLanguage
}