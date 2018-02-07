const express = require('express');
const router = express.Router();
const Reading = require('../controllers/controllerArticle');

/* GET users listing. */
router.post('/set', Reading.setReadingList);
router.get('/list/:id', Reading.readingList);
router.get('/detail/:id', Reading.readingDetail);

module.exports = router;
