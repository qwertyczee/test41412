
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save hook in the User model
    });

    // Save the user to the database
    await user.save();

    // Respond (excluding password)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: 'User registered successfully',
    });

  } catch (error) {
    console.error('Registration error:', error.message);
    // Handle potential validation errors from Mongoose
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Use generic message for security
    }

    // User matched, create JWT payload
    const payload = {
      user: {
        id: user.id, // Use user.id which is the virtual getter for _id
        username: user.username,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send token to client
      }
    );

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  register,
  login,
};
