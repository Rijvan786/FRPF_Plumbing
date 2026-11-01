import {body, validationResult} from "express-validator"


async function Validation(req,res,next){

    const error= validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
        message:error.array()
        })
    }
    next()
}


export const CreateServiceValidation=[
      body("serviceName").notEmpty().withMessage("serviceName is Required"),
      body("category").notEmpty().withMessage("category is required"),
      body("currency").notEmpty().withMessage("currency is required"),
      body("category").notEmpty().withMessage("category is required"),
      body("EstimatedTimeMinutes").notEmpty().withMessage("estimatedTimeMinutes is required"),
      Validation
]