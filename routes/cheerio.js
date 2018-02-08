const express = require('express');
const router = express.Router();
const { listReadingScraping } = require('../controllers/controllerScraping');

/* GET users listing. */
router.get('/list', listReadingScraping);

module.exports = router;
