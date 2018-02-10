const express = require('express');
const router = express.Router();
const { getDataAlreadyRead, countDataSummary } = require('../controllers/controllerHistory')
const authentification = require('../middlewares/authentification')

router.get('/reading', authentification, getDataAlreadyRead)
router.get('/summary', authentification, countDataSummary)

module.exports = router