const express = require('express');
const router = express.Router();
const Scraping = require('../controllers/controllerScraping');

/* GET users listing. */
router.get('/list', Scraping.listReadingScraping);

module.exports = router;
