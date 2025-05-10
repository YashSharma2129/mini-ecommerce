const express = require('express');
const router = express.Router();
const { register, login, getMe, loginLimiter } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const cors = require('cors');

const corsOptions = {
    origin: [
        'https://mini-ecommerce-yash.netlify.app',
        'https://mini-ecommerce-production.up.railway.app',
        'http://localhost:3000'
    ],
    credentials: true
};

// Route handlers with explicit function references
router.post('/register', cors(corsOptions), register);
router.post('/login', loginLimiter, cors(corsOptions), login);
router.get('/me', protect, cors(corsOptions), getMe);

module.exports = router;
