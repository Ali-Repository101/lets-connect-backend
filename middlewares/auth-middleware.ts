import jwt from 'jsonwebtoken'
import UserModel from "../models/User";
import userController from "../controllers/userController";
const secretkey = "w1efef313efe6f46e65dww"
// const jwt = require("jsonwebtoken");
// const secretKey:any = process.env.JWT_SECRET_KEY
interface JwtPayload {
    userID: string
}
const checkUserAuth = async (req: any, res: any, next: () => void) => {
    let token = req.headers['authorization'];
    let idToken = token.split(' ')[1]
    console.log(token)
    // const { authorization } = req.headers

    // console.log(authorization)
    // if (authorization && authorization.startsWith('Bearer')) {
    //     try {
    //         token = authorization.split(' ')[1]
    //         console.log(token)
    //         //verify token
    //         const  {userID}  = jwt.verify(token, secretKey) as JwtPayload
    //         console.log("userId", userID)
    //         req.user = await UserModel.findById(userID).select('-password')
    //         console.log("requser--", req.user)
    //         next()
    //     } catch (error) {
    //         console.log(error)
    //         res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    //     }
    // }
    // if (!token) {
    //     res.status(401).send({ "status": "failed", "message": "unauhorized user" })
    // }
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1]
            console.log(token)
            //verify token
            const  {userID}  = jwt.verify(JSON.parse(idToken), secretkey) 
            console.log("userId", userID)
            req.user = await UserModel.findById(userID).select('-password')
            console.log("requser--", req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.status(401).send({ "status": "failed", "message": "unauhorized user" })
    }
   
}
export default checkUserAuth