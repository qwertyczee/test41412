const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastWatered: {
    type: Date,
    default: Date.now
  },
  wateringFrequency: {
    type: Number,
    required: true,
    default: 7 // Default to weekly watering
  }
});
