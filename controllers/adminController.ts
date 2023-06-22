import adminModel from '../models/adminSignup'


class adminController {
    static adminSignup = async (req: any, res: any) => {
        const { companyname, companysize, role, knowLetsConnect } = req.body
        const admin = await adminModel.findOne({ companyname: companyname })
        if (admin) {
            res.send({ "status": "success", "message":"company mail already exists"})
        }else {
            if (companyname && companysize && role && knowLetsConnect) {
             
                    try {
                        
                        const doc = new adminModel({
                            companyname: companyname,
                            companysize: companysize,
                            role: role,
                            knowLetsConnect:knowLetsConnect
                        })
                        await doc.save()
                      
                        res.status(201).send({ "status": "success", "message": "you have successfully " })
                    } catch (error) {
                        res.send({ "status": "failed", "message": "unable to register" })
                        console.log(error)
                    }
               
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })

            }
        }
    }
}
export default adminController