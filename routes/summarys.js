const express = require('express');
const router = express.Router();
const { listSummaryArticle, addSummaryArticle, editSummaryArticle } = require('../controllers/controllerSummary');

/* GET users listing. */
router.get('/list', listSummaryArticle);
router.post('/add/:id', addSummaryArticle);
router.put('/edit/:id', editSummaryArticle);

module.exports = router;
