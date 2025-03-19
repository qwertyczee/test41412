const express = require('express');
const router = express.Router();
const { addWateringEvent } = require('../controllers/careEventController');
const { protect } = require('../middleware/authMiddleware');

router.post('/watering', protect, addWateringEvent);
const { protect } = require('../middleware/authMiddleware');
const {
  createCareEvent,
  getPlantCareEvents,
  getUserCareEvents,
  deleteCareEvent
} = require('../controllers/careEventController');

// Protect all routes
router.use(protect);

// Care event routes
router.post('/', createCareEvent);
router.get('/plant/:plantId', getPlantCareEvents);
router.get('/user', getUserCareEvents);
router.delete('/:id', deleteCareEvent);

module.exports = router;
