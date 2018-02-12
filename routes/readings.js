const express = require('express');
const router = express.Router();
const {setReadingList, readingList, readingDetail, readingDelete} = require('../controllers/controllerArticle');
const authentification = require('../middlewares/authentification')
/* GET users listing. */
router.post('/set', authentification, setReadingList);
router.get('/list', authentification, readingList);
router.get('/detail/:id', authentification, readingDetail);
router.delete('/delete/:id', authentification, readingDelete);

module.exports = router;
