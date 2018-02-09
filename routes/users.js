const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/controllerUser');

/* GET users listing. */
router.get('/login', loginUser);

module.exports = router;