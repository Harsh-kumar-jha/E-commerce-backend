import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// creating router object
const router = express.Router();

// routing

// 1. Register || Post method
router.post("/register", registerController);

// 2.Login || method post
router.post("/login", loginController);

// 3. forgot password || post method
router.post("/forgot-password", forgotPasswordController);

// demo test route
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
