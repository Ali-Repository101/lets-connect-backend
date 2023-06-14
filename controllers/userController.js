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
var bcrypt_1 = __importDefault(require("bcrypt"));
var userController = /** @class */ (function () {
    function userController() {
    }
    userController.userRegistration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, password, password_confirmaton, user, salt, hashPassword, doc, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password, password_confirmaton = _a.password_confirmaton;
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 2];
                    res.send({ "status": "failed", "message": "Email Already Exists" });
                    return [3 /*break*/, 12];
                case 2:
                    if (!(name && email && password && password_confirmaton)) return [3 /*break*/, 11];
                    if (!(password === password_confirmaton)) return [3 /*break*/, 9];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 7, , 8]);
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
                    res.status(201).send({ "status": "success", "message": "you have successfully register" });
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    res.send({ "status": "failed", "message": "unable to register" });
                    console.log(error_1);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    res.send({ "status": "failed", "message": "password and confirm password does'nt match" });
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    res.send({ "status": "failed", "message": "All Fields are Required" });
                    _b.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    }); };
    userController.userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!(email && password)) return [3 /*break*/, 2];
                    return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    res.send({ "status": "failed", "message": "All Fields are Required" });
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return userController;
}());
exports.default = userController;
