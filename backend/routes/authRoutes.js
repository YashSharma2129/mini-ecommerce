const express = require('express');
const router = express.Router();
const { register, login, getMe, loginLimiter } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);

module.exports = router;
