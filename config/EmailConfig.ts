import dotenv from 'dotenv'
// import nodemailer from 'nodemailer'
const nodemailer = require('nodemailer')
dotenv.config()
const h:any = process.env.EMAIL_HOST;
const v:any= process.env.EMAIL_PORT;
let transporter = nodemailer.createTransport({
    host:h,
    port:v,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})
export default transporter