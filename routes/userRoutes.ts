import express from "express";
const router = express.Router();
import userController from "../controllers/userController";

// Public Routes
router.post('/register', userController.userRegistration)

export default router