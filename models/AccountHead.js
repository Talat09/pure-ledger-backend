// models/AccountHead.js
import mongoose from "mongoose";

const accountHeadSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ["Debit", "Credit"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AccountHead", accountHeadSchema);
