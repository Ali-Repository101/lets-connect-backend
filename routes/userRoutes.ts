import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
import checkUserAuth from "../middlewares/auth-middleware"


router.use('/changepassword', checkUserAuth)
router.use('/loginuser', checkUserAuth)
// Public Routes
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.post('/send-reset-password-email', userController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', userController.userPasswordReset)

// protected routes
router.post('/changepassword', userController.changeUserPassword)
router.get('/loginuser', userController.loggedUser)

export default router