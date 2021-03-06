const express = require('express')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID
const dialogflow = require('dialogflow')
const { listReadingScraping } = require('./controllerScraping')

const Storage = require('@google-cloud/storage')
const storage = Storage({
  keyFilename: '/home/andrey_amrulloh/hacktiv8/keyfile.json'
})


const chatBot = (req, res) => {
  
  const projectId = process.env.CHATBOT_PROJECT
  const sessionId = 'asdasd'
  const query = req.body.chat
  const languageCode = 'en-US'
  console.log(query) 
  const sessionClient = new dialogflow.SessionsClient();
   
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
   
  const request = {
    keyFilename: '/home/andrey_amrulloh/hacktiv8/keyfile.json',
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
      const result = responses[0].queryResult;
      let parameter = ''
      if(result.parameters.fields['categories-original']){
        parameter = result.parameters.fields['categories-original'].stringValue
        res.status(HttpStatus.OK).json({
          messages: 'Chat BOT',
          data: result.fulfillmentText,
          category: parameter
        })
      }else if(result.parameters.fields['summary-name']){
        parameter = result.parameters.fields['summary-name'].stringValue
        res.status(HttpStatus.OK).json({
          messages: 'Chat BOT',
          data: result.fulfillmentText,
          summary: parameter
        })
      }else if(result.parameters.fields['help-parameter']){
        res.status(HttpStatus.OK).json({
          messages: 'Chat BOT',
          data: result.fulfillmentText,
          help: 'help'
        })
      }else if(result.parameters.fields['navigation-parameter']){
        parameter = result.parameters.fields['navigation-parameter'].stringValue
        res.status(HttpStatus.OK).json({
          messages: 'Chat BOT',
          data: result.fulfillmentText,
          navigation: parameter 
        })
      
      }else{
        res.status(HttpStatus.OK).json({
          messages: 'Chat BOT',
          data: result.fulfillmentText,
          category: parameter
        })
      }
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
