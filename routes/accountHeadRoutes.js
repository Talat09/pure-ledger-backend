// routes/accountHeadRoutes.js
import express from "express";
import {
  addAccountHead,
  getAccountHeads,
} from "../controllers/accountHeadController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAccountHead);
router.get("/", protect, getAccountHeads);

export default router;
