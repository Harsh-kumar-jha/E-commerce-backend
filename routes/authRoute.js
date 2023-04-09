import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// creating router object
const router = express.Router();

// routing

// 1. Register || Post method
router.post("/register", registerController);

// 2.Login || method post
router.post("/login", loginController);

// demo test route
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
