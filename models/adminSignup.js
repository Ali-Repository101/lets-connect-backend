"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Defigning Schema for adminSignup
var adminSchema = new mongoose_1.default.Schema({
    companyname: { type: String, required: true, trim: true },
    companysize: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    knowLetsConnect: { type: String, required: true, trim: true }
});
var AdminModel = mongoose_1.default.model("AdminSignup", adminSchema);
exports.default = AdminModel;
