const express = require('express');
const router = express.Router();
const { listReadingScraping } = require('../controllers/controllerScraping');

/* GET users listing. */
router.post('/', listReadingScraping);

module.exports = router;
