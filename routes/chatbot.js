const express = require('express');
const router = express.Router();
const { } = require('../controllers/chatbot')

router.get('/', Movie.get)
// router.get('/:id', Movie.getSingle)
router.post('/', Movie.create)
// router.put('/:id', Movie.update)
// router.delete('/:id', Movie.delete)


module.exports = router