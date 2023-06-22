import mongoose from "mongoose";
// Defigning Schema for adminSignup


const adminSchema = new mongoose.Schema({
    companyname: {type:String, required: true, trim:true},
    companysize: {type:String, required:true, trim:true},
    role: {type:String, required:true, trim:true},
    knowLetsConnect:{type:String, required:true, trim:true}
})

const AdminModel = mongoose.model("AdminSignup", adminSchema)

export default AdminModel