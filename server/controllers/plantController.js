const Plant = require('../models/Plant');

// Create a new plant
exports.createPlant = async (req, res) => {
  try {
    const plantData = {
      ...req.body,
      userId: req.user._id // Assuming user is attached to req by auth middleware
    };

    const plant = await Plant.create(plantData);
    
    res.status(201).json({
      status: 'success',
      data: {
        plant
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all plants for a user
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user._id });
    
    res.status(200).json({
      status: 'success',
      results: plants.length,
      data: {
        plants
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get a single plant
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        plant
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update a plant
exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        plant
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete a plant
exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update last watered date
exports.waterPlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      { lastWatered: Date.now() },
      {
        new: true,
        runValidators: true
      }
    );

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        plant
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
