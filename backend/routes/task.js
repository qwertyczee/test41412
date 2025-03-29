
const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all task routes
// This ensures only authenticated users can access these endpoints
router.use(authMiddleware);

// Define CRUD routes for tasks
router.route('/')
  .get(getTasks) // Get all tasks for the logged-in user
  .post(createTask); // Create a new task

router.route('/:id')
  .get(getTaskById) // Get a specific task by ID
  .put(updateTask) // Update a specific task by ID
  .delete(deleteTask); // Delete a specific task by ID

module.exports = router;
