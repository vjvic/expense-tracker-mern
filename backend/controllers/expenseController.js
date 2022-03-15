const asyncHandler = require("express-async-handler");

// @desc    Get expense
// @route   GET /api/expense
// @access  Private
const getExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "test" });
});

// @desc    update expense
// @route   PUT /api/expense
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update" });
});

// @desc    delete expense
// @route   DElETE /api/expnse
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete" });
});

// @desc    create expense
// @route   POST /api/expense
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "create" });
});

module.exports = {
  getExpense,
  updateExpense,
  deleteExpense,
  createExpense,
};
