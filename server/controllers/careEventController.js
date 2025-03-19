const CareEvent = require('../models/CareEvent');
const Plant = require('../models/Plant');

// Update the last watered date when adding a watering event
exports.addWateringEvent = async (req, res) => {
  try {
    const { plantId, date, notes } = req.body;
    
    // Create care event
    const careEvent = await CareEvent.create({
      plantId,
      type: 'watering',
      date,
      notes
    });

    // Update plant's last watered date
    await Plant.findByIdAndUpdate(plantId, {
      lastWatered: date || new Date()
    });

    res.status(201).json({
      success: true,
      data: careEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new care event
exports.createCareEvent = async (req, res) => {
  try {
    const { plantId, type, notes } = req.body;

    // Validate if plant exists
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    // Create care event
    const careEvent = await CareEvent.create({
      plantId,
      type,
      notes,
      createdBy: req.user._id
    });

    // Update lastWatered field if this is a watering event
    if (type === 'water') {
      await Plant.findByIdAndUpdate(plantId, {
        lastWatered: careEvent.date
      });
    }

    res.status(201).json({
      success: true,
      data: careEvent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get care events for a specific plant
exports.getPlantCareEvents = async (req, res) => {
  try {
    const { plantId } = req.params;
    const careEvents = await CareEvent.find({ plantId })
      .sort({ date: -1 })
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      count: careEvents.length,
      data: careEvents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all care events for user's plants
exports.getUserCareEvents = async (req, res) => {
  try {
    const careEvents = await CareEvent.find({ createdBy: req.user._id })
      .sort({ date: -1 })
      .populate('plantId', 'name species')
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      count: careEvents.length,
      data: careEvents
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a care event
exports.deleteCareEvent = async (req, res) => {
  try {
    const careEvent = await CareEvent.findById(req.params.id);

    if (!careEvent) {
      return res.status(404).json({ message: 'Care event not found' });
    }

    // Ensure user owns the care event
    if (careEvent.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this care event' });
    }

    await careEvent.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
