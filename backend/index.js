
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import auth routes
const taskRoutes = require('./routes/task'); // Import task routes

const app = express();
const PORT = process.env.PORT || 3001; // Default port if not specified in .env

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware to log requests (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount task routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1); // Exit if MongoDB URI is not set
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    // Exit on initial connection error - prevents server starting without DB.
    process.exit(1);
  });

// Handle Mongoose connection events after initial connection
mongoose.connection.on('error', err => {
  // Mongoose driver attempts reconnection automatically. Log subsequent errors.
  console.error('MongoDB connection error after initial connection:', err);
});

mongoose.connection.on('disconnected', () => {
  // Log disconnection events. Mongoose driver might attempt reconnection.
  console.log('MongoDB disconnected.');
});

