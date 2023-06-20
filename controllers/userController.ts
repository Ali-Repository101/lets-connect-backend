import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import transporter from "../config/EmailConfig.js";
const nodemailer = require("nodemailer")

const secretkey = "w1efef313efe6f46e65dww"
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'emmett.harber@ethereal.email',
        pass: '2kk8dHsjyH7fYYebJu'
    },
})
// const secretKey: any = process.env.JWT_SECRET_KEY
class userController {

    static userRegistration = async (req: any, res: any) => {
        const { name, email, password, password_confirmaton } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ "status": "failed", "message": "Email Already Exists" })
        } else {
            if (name && email && password && password_confirmaton) {
                if (password === password_confirmaton) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword
                        })
                        await doc.save()
                        const saved_user = await UserModel.findOne({ email: email })
                        // Generate JWt token
                        const jwttoken = jwt.sign({ userID: saved_user?._id }, secretkey, { expiresIn: '5d' })
                        res.status(201).send({ "status": "success", "message": "you have successfully register", "token": jwttoken })
                    } catch (error) {
                        res.send({ "status": "failed", "message": "unable to register" })
                        console.log(error)
                    }
                } else {
                    res.send({ "status": "failed", "message": "password and confirm password does'nt match" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })

            }
        }
    }
    static userLogin = async (req: any, res: any) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        // Generate jwt token 
                        const jwttoken = jwt.sign({ userID: user?._id }, secretkey, { expiresIn: '5d' })
                        res.send({ "status": "success", "message": "you have successfully logged in", token: jwttoken })
                    } else {
                        res.send({ "status": "failed", "message": "email or password doesnot match" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not a registered user" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to logged in" })
        }
    }
    static changeUserPassword = async (req: any, res: any) => {
        console.log("requestUser", req.user)
        const { password, password_confirmaton } = req.body
        if (password && password_confirmaton) {
            if (password !== password_confirmaton) {
                res.send({ "status": "failed", "message": "New Password and Confirm password Does not Match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                await UserModel.findByIdAndUpdate(req.user?._id, { $set: { password: hashPassword } })
                res.send({ "status": "success", "message": "Password changed successfully" })
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }
    }
    static loggedUser = async (req: any, res: any) => {
        const user = req.user
        res.send({ "user": user })
        console.log("req.user", req.user)
    }
    static sendUserPasswordResetEmail = async (req: any, res: any) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email })
            if (user) {
                console.log("user", user)
                console.log(user.email)
                const secret = user?._id + secretkey
                const token = jwt.sign({ userID: user?._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                console.log(link)
                const info = await transporter.sendMail({
                    from: '<manas745588@gmail.com>',
                    to: user.email,
                    subject: "Lets Connect-Password Reset Link",
                    html: `<a href = ${link}>Click here</a> to Reset your password`
                })
                res.send({ "status": "sucess", "message": "Email Sent Successfully" })
                console.log(info.messageId)
            } else {
                res.send({ "status": "failed", "message": "Email doesnot exist" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Field is required" })
        }
    }
    static userPasswordReset = async (req: any, res: any) => {
        const { password, password_confirmaton } = req.body
        const { id, token } = req.params
        console.log("ID", id)
        const parseToken = JSON.stringify(token)
        console.log("parseoken", parseToken)
        const user = await UserModel.findById(id)
        const new_secret = user?._id + secretkey
        try {
            jwt.verify(JSON.parse(parseToken), new_secret)
            if (password && password_confirmaton) {
                if (password !== password_confirmaton) {
                    res.send({ "status": "failed", "message": "new password and confirm new password does'nt match" })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    await UserModel.findByIdAndUpdate(user?._id, { $set: { password: hashPassword } })
                    res.send({ "status": "success", "message": "Password reset successfully" })
                }
            } else {
                res.send({ "status": "success", "message": "All fields are required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "password doesnot reset successfully" })
        }
    }
}
export default userController