const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPlant,
  getAllPlants,
  getPlant,
  updatePlant,
  deletePlant,
  waterPlant
} = require('../controllers/plantController');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/')
  .get(getAllPlants)
  .post(createPlant);

router
  .route('/:id')
  .get(getPlant)
  .patch(updatePlant)
  .delete(deletePlant);

router
  .route('/:id/water')
  .patch(waterPlant);

module.exports = router;
