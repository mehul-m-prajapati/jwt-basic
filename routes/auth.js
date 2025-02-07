const express = require('express');
const router = express.Router();

const { signup, login, refreshToken } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router;    // Export the router object
