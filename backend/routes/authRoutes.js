const express = require('express');

const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter')

const router = express.Router();

router.post('/user', authController.register);

module.exports = router;