import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
// creating router object
const router = express.Router();

// routing

// 1. Register || Post method
router.post("/register", registerController);

// 2.Login || method post
router.post("/login", loginController);

export default router;
