/**
 * Calculate the next watering date based on last watered date and watering frequency
 * @param {Date} lastWateredDate - The date the plant was last watered
 * @param {number} wateringFrequency - Number of days between waterings
 * @returns {Date} The next watering date
 */
const calculateNextWateringDate = (lastWateredDate, wateringFrequency) => {
  const nextDate = new Date(lastWateredDate);
  nextDate.setDate(nextDate.getDate() + wateringFrequency);
  return nextDate;
};

/**
 * Check if a plant needs watering
 * @param {Date} lastWateredDate - The date the plant was last watered
 * @param {number} wateringFrequency - Number of days between waterings
 * @returns {boolean} True if plant needs watering
 */
const needsWatering = (lastWateredDate, wateringFrequency) => {
  const nextWateringDate = calculateNextWateringDate(lastWateredDate, wateringFrequency);
  return new Date() >= nextWateringDate;
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

module.exports = {
  calculateNextWateringDate,
  needsWatering,
  formatDate
};
