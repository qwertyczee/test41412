
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
require('dotenv').config();

const protect = async (req, res, next) => { // Make the function async
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token payload and attach to request object
      // Exclude password from the user object attached to req
      req.user = await User.findById(decoded.user.id).select('-password');

      if (!req.user) {
        // Handle case where user associated with token no longer exists
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification error:', error.message);
      // Handle different JWT errors specifically if needed (e.g., TokenExpiredError)
      res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
