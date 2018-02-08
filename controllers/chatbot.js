const express = require('express')
const router = express.Router()
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID
const dialogflow = require('dialogflow');

const chatBot = (req, res) => {
  const projectId = process.env.CHATBOT_PROJECT
  const sessionId = 'idUser001'
  const query = req.body.chat
  const languageCode = 'en-US'
   
  const sessionClient = new dialogflow.SessionsClient();
   
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
   
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };
   
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(result);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      res.status(HttpStatus.OK).json({
        messages: 'Chat BOT',
        data: result.queryText
      })
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: 'Chat BOT error',
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      })
    });
}

module.exports = {
  chatBot
}