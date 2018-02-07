const express = require('express');
const router = express.Router();
const Summary = require('../controllers/controllerSummary');

/* GET users listing. */
router.get('/list', Summary.listSummaryArticle);
router.post('/add/:id', Summary.addSummaryArticle);
router.put('/edit/:id', Summary.editSummaryArticle);

module.exports = router;
