const express = require('express');
const router = express.Router();
const { chatBot } = require('../controllers/chatbot')

router.post('/', chatBot)


module.exports = router