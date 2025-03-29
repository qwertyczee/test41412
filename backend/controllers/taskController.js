
const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Assuming req.user is populated by auth middleware with the user's ID
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    // Basic check for required fields (though schema validation is primary)
    if (!title) {
      return res.status(400).json({ msg: 'Title is required' });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user.id, // Associate task with the logged-in user
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    // Check for Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  // Build task object based on fields submitted
  const taskFields = {};
  if (title !== undefined) taskFields.title = title; // Allow empty string for title update
  if (description !== undefined) taskFields.description = description;
  if (dueDate !== undefined) taskFields.dueDate = dueDate;
  if (priority !== undefined) taskFields.priority = priority;
  if (status !== undefined) taskFields.status = status;


  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Basic check: ensure at least one field is being updated
    if (Object.keys(taskFields).length === 0) {
        return res.status(400).json({ msg: 'At least one field must be provided for update' });
    }
     // Prevent updating title to an empty string if it's required
    if (taskFields.title === '') {
        return res.status(400).json({ msg: 'Title cannot be empty' });
    }


    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true, runValidators: true } // Return the modified document and run schema validators
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
     // Check for Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
    }
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
