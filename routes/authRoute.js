import express from "express";
import { registerController } from "../controllers/authController.js";
// creating router object
const router = express.Router();

// routing

// 1. Register || Post method
router.post("/register", registerController);

export default router;
