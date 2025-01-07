// controllers/accountHeadController.js
import AccountHead from "../models/AccountHead.js";

// Add Account Head
export const addAccountHead = async (req, res) => {
  const { name, type } = req.body;

  try {
    // Ensure the account head is unique
    const existingHead = await AccountHead.findOne({ name });
    if (existingHead) {
      return res.status(400).json({ message: "Account head already exists" });
    }

    // Create a new account head
    const accountHead = await AccountHead.create({ name, type });
    res.status(201).json({ accountHead });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Account Heads
export const getAccountHeads = async (req, res) => {
  try {
    const accountHeads = await AccountHead.find();
    res.json(accountHeads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
