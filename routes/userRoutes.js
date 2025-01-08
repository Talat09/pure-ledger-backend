import express from "express"; // Use `import` for express
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js"; // `import` for controllers

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router; // Use `export default` for the router in ES Modules
