const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/controllerUser');

/* GET users listing. */
router.post('/login', loginUser);

module.exports = router;