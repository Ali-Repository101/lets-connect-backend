import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


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
                        res.status(201).send({ "status": "success", "message": "you have successfully register" })
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
        const { email, password } = req.body
        if (email && password) {
            const user = await UserModel.findOne({ email: email })
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }
}
export default userController