const express = require('express')
const router = express.Router()
const {
  listSummaryArticle,
  addSummaryArticle,
  editSummaryArticle
} = require('../controllers/controllerSummary')
const authentification = require('../middlewares/authentification')
/* GET users listing. */
router.get('/list', authentification, listSummaryArticle)
router.post('/add/:id', authentification, addSummaryArticle)
router.put('/edit/:id', authentification, editSummaryArticle)

module.exports = router
