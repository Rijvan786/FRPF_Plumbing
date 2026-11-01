import {body ,validationResult} from "express-validator"


export async function Validation(req,res,next){
    const error =await validationResult(req)

    if(!error.isEmpty()){
        return  res.status(400).json({

            message:error.array()
        })
        }
    next()
}



export const CreateOrderValidation=[
    body("serviceId").notEmpty().withMessage("ServiceId is Required"),
    body("issueDescription").notEmpty().withMessage("issueDescription is Required"),
    body("label").notEmpty().withMessage("label is Required"),
    body("city").notEmpty().withMessage("city is Required"),
    body("pin_code").notEmpty().withMessage("pin_code is Required"),
    body("longitude").notEmpty().withMessage("longitude is Required"),
    body("latitude").notEmpty().withMessage("latitude is Required"),
    body("scheduleDate").notEmpty().withMessage("scheduleDate is Required"),
    Validation
    
]