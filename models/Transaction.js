const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    accountType: { type: String, enum: ["Income", "Expense"], required: true },
    accountHead: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
