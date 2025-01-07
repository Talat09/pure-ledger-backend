const Transaction = require("../models/Transaction");

// Add Transaction
exports.addTransaction = async (req, res) => {
  const { date, accountType, accountHead, amount } = req.body;
  try {
    const latestTransaction = await Transaction.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });
    const currentBalance = latestTransaction ? latestTransaction.balance : 0;
    const newBalance =
      accountType === "Income"
        ? currentBalance + amount
        : currentBalance - amount;

    if (newBalance < 0)
      return res.status(400).json({ message: "Insufficient balance" });

    const transaction = await Transaction.create({
      user: req.user._id,
      date,
      accountType,
      accountHead,
      amount,
      balance: newBalance,
    });
    res.status(201).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
