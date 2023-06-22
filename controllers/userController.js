"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_js_1 = __importDefault(require("../models/User.js"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// import transporter from "../config/EmailConfig.js";
var nodemailer = require("nodemailer");
var secretkey = "w1efef313efe6f46e65dww";
var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'emmett.harber@ethereal.email',
        pass: '2kk8dHsjyH7fYYebJu'
    },
});
// const secretKey: any = process.env.JWT_SECRET_KEY
var userController = /** @class */ (function () {
    function userController() {
    }
    userController.userRegistration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, password, password_confirmaton, user, salt, hashPassword, doc, saved_user, jwttoken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password, password_confirmaton = _a.password_confirmaton;
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 2];
                    res.send({ "status": "failed", "message": "Email Already Exists" });
                    return [3 /*break*/, 13];
                case 2:
                    if (!(name && email && password && password_confirmaton)) return [3 /*break*/, 12];
                    if (!(password === password_confirmaton)) return [3 /*break*/, 10];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, , 9]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 4:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 5:
                    hashPassword = _b.sent();
                    doc = new User_js_1.default({
                        name: name,
                        email: email,
                        password: hashPassword
                    });
                    return [4 /*yield*/, doc.save()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })
                        // Generate JWt token
                    ];
                case 7:
                    saved_user = _b.sent();
                    jwttoken = jsonwebtoken_1.default.sign({ userID: saved_user === null || saved_user === void 0 ? void 0 : saved_user._id }, secretkey, { expiresIn: '5d' });
                    res.status(201).send({ "status": "success", "message": "you have successfully register", "token": jwttoken });
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    res.send({ "status": "failed", "message": "unable to register" });
                    console.log(error_1);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    res.send({ "status": "failed", "message": "password and confirm password does'nt match" });
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    res.send({ "status": "failed", "message": "All Fields are Required" });
                    _b.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    }); };
    userController.userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, isMatch, jwttoken, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!(email && password)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!(user != null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    isMatch = _b.sent();
                    if ((user.email === email) && isMatch) {
                        jwttoken = jsonwebtoken_1.default.sign({ userID: user === null || user === void 0 ? void 0 : user._id }, secretkey, { expiresIn: '5d' });
                        res.send({ "status": "success", "message": "you have successfully logged in", token: jwttoken });
                    }
                    else {
                        res.send({ "status": "failed", "message": "email or password doesnot match" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.send({ "status": "failed", "message": "You are not a registered user" });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.send({ "status": "failed", "message": "All Fields are Required" });
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    console.log(error_2);
                    res.send({ "status": "failed", "message": "Unable to logged in" });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    userController.changeUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, password, password_confirmaton, salt, hashPassword;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("requestUser", req.user);
                    _a = req.body, password = _a.password, password_confirmaton = _a.password_confirmaton;
                    if (!(password && password_confirmaton)) return [3 /*break*/, 6];
                    if (!(password !== password_confirmaton)) return [3 /*break*/, 1];
                    res.send({ "status": "failed", "message": "New Password and Confirm password Does not Match" });
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _c.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3:
                    hashPassword = _c.sent();
                    return [4 /*yield*/, User_js_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, { $set: { password: hashPassword } })];
                case 4:
                    _c.sent();
                    res.send({ "status": "success", "message": "Password changed successfully" });
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.send({ "status": "failed", "message": "All fields are required" });
                    _c.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    userController.loggedUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = req.user;
            res.send({ "user": user });
            console.log("req.user", req.user);
            return [2 /*return*/];
        });
    }); };
    userController.sendUserPasswordResetEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var email, user, secret, token, link, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    if (!email) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    console.log("user", user);
                    console.log(user.email);
                    secret = (user === null || user === void 0 ? void 0 : user._id) + secretkey;
                    token = jsonwebtoken_1.default.sign({ userID: user === null || user === void 0 ? void 0 : user._id }, secret, { expiresIn: '15m' });
                    link = "http://127.0.0.1:3000/api/user/reset/" + user._id + "/" + token;
                    console.log(link);
                    return [4 /*yield*/, transporter.sendMail({
                            from: '<manas745588@gmail.com>',
                            to: user.email,
                            subject: "Lets Connect-Password Reset Link",
                            html: "<a href = " + link + ">Click here</a> to Reset your password"
                        })];
                case 2:
                    info = _a.sent();
                    res.send({ "status": "sucess", "message": "Email Sent Successfully" });
                    console.log(info.messageId);
                    return [3 /*break*/, 4];
                case 3:
                    res.send({ "status": "failed", "message": "Email doesnot exist" });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.send({ "status": "failed", "message": "Email Field is required" });
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    userController.userPasswordReset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, password, password_confirmaton, _b, id, token, parseToken, user, new_secret, salt, hashPassword, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, password = _a.password, password_confirmaton = _a.password_confirmaton;
                    _b = req.params, id = _b.id, token = _b.token;
                    console.log("ID", id);
                    parseToken = JSON.stringify(token);
                    console.log("parseoken", parseToken);
                    return [4 /*yield*/, User_js_1.default.findById(id)];
                case 1:
                    user = _c.sent();
                    new_secret = (user === null || user === void 0 ? void 0 : user._id) + secretkey;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 10, , 11]);
                    jsonwebtoken_1.default.verify(JSON.parse(parseToken), new_secret);
                    if (!(password && password_confirmaton)) return [3 /*break*/, 8];
                    if (!(password !== password_confirmaton)) return [3 /*break*/, 3];
                    res.send({ "status": "failed", "message": "new password and confirm new password does'nt match" });
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 4:
                    salt = _c.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 5:
                    hashPassword = _c.sent();
                    return [4 /*yield*/, User_js_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { $set: { password: hashPassword } })];
                case 6:
                    _c.sent();
                    res.send({ "status": "success", "message": "Password reset successfully" });
                    _c.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    res.send({ "status": "success", "message": "All fields are required" });
                    _c.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_3 = _c.sent();
                    console.log(error_3);
                    res.send({ "status": "failed", "message": "password doesnot reset successfully" });
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return userController;
}());
exports.default = userController;
