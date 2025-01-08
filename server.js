import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js"; // Use .js for ES modules
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import accountHeadRoutes from "./routes/accountHeadRoutes.js";
dotenv.config();
const app = express();
connectDB();
const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Enable cookies
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/account-heads", accountHeadRoutes);
// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World! From Pure Ledger Backend.");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
