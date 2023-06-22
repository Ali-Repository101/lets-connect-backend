import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
import checkUserAuth from "../middlewares/auth-middleware"
import adminController from "../controllers/adminController";


router.use('/changepassword', checkUserAuth)
router.use('/loginuser', checkUserAuth)
router.use('/adminUser',adminController.adminSignup)
// Public Routes
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)
router.post('/send-reset-password-email', userController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', userController.userPasswordReset)

// protected routes
router.post('/changepassword', userController.changeUserPassword)
router.get('/loginuser', userController.loggedUser)
router.post('/adminUser',adminController.adminSignup)

export default router