import UserModel from "../models/auth.model.js"
import TechnicianProfileModel from "../models/Technicianprofile.model.js";
import { SendMailDynamicContent } from "../service/email.service.js";
import { validatedAndFormate } from "../validator/contact.validator.js";

export async function RegisterTechnicianController(req,res){

 try {
       const {FullName,email,contact,password,role,experienceYears,street,city,pin_code,longitude,latitude}=req.body
       console.log(FullName,email,contact,password,experienceYears);
       

    

     const ValidContact = await validatedAndFormate(contact);
        if (!ValidContact) {
          return res.status(400).json({ message: "Invalid Contact Number" });
        }
     const isExist = await UserModel.findOne({
                $or: [
                    { email: email },
                    { contact: ValidContact }
                ]
            })
    
            if (isExist) {
                return res.status(400).json(
                  {message: `User ${isExist.email === email ? "email is already registered" : "contact is already registered"}`})
            }
            
    const user=await UserModel.create({
       FullName,
       email,
       contact:ValidContact,
       password:password,
       role:role
    })
console.log(user._id,"ID of User");
    const TechnicianProfile=await TechnicianProfileModel.create({
        userId:user._id,
        experienceYears:experienceYears,
        permanentAddress:{
               street:street,
               city:city,
               pin_code:pin_code
        },
        liveLocation:{
            type:"Point",
            coordinates:[longitude,latitude]
        }

    })
    await SendMailDynamicContent({
        subject,
        email,
        html
    })

    res.status(200).json({
        message:"Plumber is Register successfully And Schedule their Interview According to time slot ",
        TechnicianProfile
    })
 } catch (error) {
    return res.status(500).json({
        message:"Internal Server error",
        error :error.message
    })
 }
    
}

export async function GetCustomerController(req,res){
    
}

export async function AcceptedWorkController(req,res){

    const {service_Id}=req.body
    

}

