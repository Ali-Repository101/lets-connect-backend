"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
// import nodemailer from 'nodemailer'
var nodemailer = require('nodemailer');
dotenv_1.default.config();
var h = process.env.EMAIL_HOST;
var v = process.env.EMAIL_PORT;
var transporter = nodemailer.createTransport({
    host: h,
    port: v,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});
exports.default = transporter;
