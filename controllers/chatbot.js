const express = require('express')
const router = express.Router()
const ChatBotModel = require('../models/chatbot')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID

class ChatBotController {
  static listCategories(req, res){
    //Scrapping data
    //res send data hasil scrapping
  }
  static chooseCategories(req, res){
    //masukkan ke database reading list
    //res send data hasil inputan ke reading list
  }
  static readingStatus(req, res){
    //ubah status databse reading list menjadi on going or true
    //input summary ke dalam models summaryArticle
    
  }
  static summaryStatus(req, res){
    //input summary ke model
    //compare summary article dan summary user

  }
 
}

module.exports = ChatBotController
