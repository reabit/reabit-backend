const express = require('express');
const router = express.Router();
const { getDataAlreadyRead, countDataSummary } = require('../controllers/controllerHistory')

router.get('/reading/:idUser', getDataAlreadyRead)
router.get('/summary/:idUser', countDataSummary)

module.exports = router