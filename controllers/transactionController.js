// controllers/transactionController.js
import Transaction from "../models/Transaction.js";
import AccountHead from "../models/AccountHead.js";

// Add Transaction
export const addTransaction = async (req, res) => {
  const { date, accountType, accountHeadId, amount } = req.body;

  try {
    // Validate account head
    const accountHead = await AccountHead.findById(accountHeadId);
    if (!accountHead) {
      return res.status(404).json({ message: "Account head not found" });
    }

    // Validate account type consistency with account head type
    if (
      (accountType === "Income" && accountHead.type !== "Credit") ||
      (accountType === "Expense" && accountHead.type !== "Debit")
    ) {
      return res.status(400).json({
        message: `Account head type (${accountHead.type}) does not match transaction type (${accountType})`,
      });
    }

    // Fetch the latest transaction to calculate balance
    const latestTransaction = await Transaction.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const currentBalance = latestTransaction ? latestTransaction.balance : 0;

    // Calculate new balance
    const newBalance =
      accountType === "Income"
        ? currentBalance + amount
        : currentBalance - amount;

    // Check for insufficient balance
    if (newBalance < 0) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create new transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      date,
      accountType,
      accountHead: accountHeadId,
      amount,
      balance: newBalance,
    });

    res.status(201).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).populate("accountHead", "name type");

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
