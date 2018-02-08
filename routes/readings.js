const express = require('express');
const router = express.Router();
const {setReadingList, readingList, readingDetail } = require('../controllers/controllerArticle');

/* GET users listing. */
router.post('/set', setReadingList);
router.get('/list/:id', readingList);
router.get('/detail/:id', readingDetail);

module.exports = router;
