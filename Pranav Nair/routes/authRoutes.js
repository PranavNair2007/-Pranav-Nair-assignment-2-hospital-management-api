const express = require('express');
const { register, login, logout, me } = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', ensureAuthenticated, logout);
router.get('/me', ensureAuthenticated, me);

module.exports = router;
