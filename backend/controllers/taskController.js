const asyncHandler = require("express-async-handler");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "test" });
});

// @desc    update task
// @route   PUT /api/tasks
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update" });
});

// @desc    delete task
// @route   DElETE /api/tasks
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete" });
});

// @desc    create task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "create" });
});

module.exports = {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
};
