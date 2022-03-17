const asyncHandler = require("express-async-handler");
const Expense = require("../model/expenseModel");

// @desc    Get expense
// @route   GET /api/expense
// @access  Private
const getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.user.id });

  res.status(200).json(expense);
});

// @desc    update expense
// @route   PUT /api/expense
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  //Check for expense
  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }

  //Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedExpense);
});

// @desc    delete expense
// @route   DElETE /api/expnse
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  //Check for expense
  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }

  //Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await expense.deleteOne(expense);

  res.status(200).json({ id: req.params.id });
});

// @desc    create expense
// @route   POST /api/expense
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { name, amount, category } = req.body;

  if (!name && !amount && !category) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const expense = await Expense.create({
    name,
    amount,
    category,
    user: req.user.id,
  });

  res.status(200).json(expense);
});

module.exports = {
  getExpense,
  updateExpense,
  deleteExpense,
  createExpense,
};
