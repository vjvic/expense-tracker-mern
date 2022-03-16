const express = require("express");
const router = express.Router();
const {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getExpense).post(createExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
