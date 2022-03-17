const express = require("express");
const router = express.Router();
const {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getExpense).post(protect, createExpense);
router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
