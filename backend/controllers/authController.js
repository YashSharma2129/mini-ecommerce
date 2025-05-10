const User = require('../models/userModel'); // Fix model import path
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    const errors = [];
    if (!name || name.length < 2) errors.push('Name must be at least 2 characters');
    if (!validateEmail(email)) errors.push('Invalid email format');
    if (password.length < 6) errors.push('Password must be at least 6 characters');

    if (errors.length > 0) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Validation failed',
        errors 
      });
    }

    // Check for existing user with detailed error
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Account already exists',
        detail: 'An account with this email already exists. Please try logging in instead.'
      });
    }

    // Check for JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration',
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// Apply rate limiter to login route
exports.loginLimiter = loginLimiter;

module.exports = {
  register,
  login,
  getMe
};
