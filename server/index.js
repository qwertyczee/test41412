const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { scheduleReminders } = require('./utils/reminderScheduler');

// Load environment variables
dotenv.config();

// Initialize watering reminders scheduler
scheduleReminders();
