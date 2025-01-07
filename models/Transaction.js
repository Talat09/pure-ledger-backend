// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    accountType: { type: String, enum: ["Income", "Expense"], required: true },
    accountHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountHead",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
