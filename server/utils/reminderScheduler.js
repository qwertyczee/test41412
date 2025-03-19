const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Plant = require('../models/Plant');
const User = require('../models/User');
const { needsWatering, formatDate, calculateNextWateringDate } = require('./dateUtils');

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send watering reminder email to user
 * @param {Object} user - User object with email
 * @param {Array} plantsToWater - Array of plants that need watering
 */
const sendWateringReminder = async (user, plantsToWater) => {
  const plantList = plantsToWater
    .map(plant => `- ${plant.name} (Last watered: ${formatDate(plant.lastWatered)})`)
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: '🌿 Plant Watering Reminder',
    text: `Hello ${user.name}!\n\nThe following plants need watering today:\n\n${plantList}\n\nHappy Gardening!`,
    html: `
      <h2>Hello ${user.name}!</h2>
      <p>The following plants need watering today:</p>
      <ul>
        ${plantsToWater.map(plant => `
          <li><strong>${plant.name}</strong> (Last watered: ${formatDate(plant.lastWatered)})</li>
        `).join('')}
      </ul>
      <p>Happy Gardening! 🌿</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Watering reminder sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending watering reminder:', error);
  }
};

/**
 * Check all plants and send reminders for those that need watering
 */
const checkPlantsAndSendReminders = async () => {
  try {
    // Get all users with their plants
    const users = await User.find().select('email name');
    
    for (const user of users) {
      const plants = await Plant.find({ userId: user._id });
      const plantsNeedingWater = plants.filter(plant => 
        needsWatering(plant.lastWatered, plant.wateringFrequency)
      );

      if (plantsNeedingWater.length > 0) {
        await sendWateringReminder(user, plantsNeedingWater);
      }
    }
  } catch (error) {
    console.error('Error checking plants for watering:', error);
  }
};

// Schedule daily check at 9:00 AM
const scheduleReminders = () => {
  cron.schedule('0 9 * * *', () => {
    console.log('Running daily plant watering check...');
    checkPlantsAndSendReminders();
  });
};

// Function to manually trigger reminders check (useful for testing)
const checkRemindersNow = () => {
  return checkPlantsAndSendReminders();
};

module.exports = {
  scheduleReminders,
  checkRemindersNow
};
