const express = require('express');
const { register, login, logout, forgotPassword, resetPassword, userDetail } = require('../controllers/user.js');
const { authenticationMid } = require('../middleware/auth.js');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);
router.get('/profile', authenticationMid, userDetail);

module.exports = router;