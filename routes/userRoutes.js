"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = __importDefault(require("../controllers/userController"));
var auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
var adminController_1 = __importDefault(require("../controllers/adminController"));
router.use('/changepassword', auth_middleware_1.default);
router.use('/loginuser', auth_middleware_1.default);
router.use('/adminUser', adminController_1.default.adminSignup);
// Public Routes
router.post('/register', userController_1.default.userRegistration);
router.post('/login', userController_1.default.userLogin);
router.post('/send-reset-password-email', userController_1.default.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token', userController_1.default.userPasswordReset);
// protected routes
router.post('/changepassword', userController_1.default.changeUserPassword);
router.get('/loginuser', userController_1.default.loggedUser);
router.post('/adminUser', adminController_1.default.adminSignup);
exports.default = router;
