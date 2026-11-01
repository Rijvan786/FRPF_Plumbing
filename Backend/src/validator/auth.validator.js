import {body, validationResult}  from "express-validator"

export async function Validation(req,res,next) {
    
    const error =await validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            message:error.array()
        })
    }
    next()

}
  
export const   RegisterValidator=[
    body("FullName").notEmpty().withMessage("FullName is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").matches(/^(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/).withMessage("Password must be at least 8 character and include one special character or at least on number"),
    body("role").matches(/^(customer|technician)$/).withMessage("Role must be customer and technician"),
    body("experienceYears")
        .if((value, { req }) => req.body.role === 'technician')
        .notEmpty().withMessage("Experience Years is required")
        .isNumeric().withMessage('Experience years must be a number'), 
    body("street") 
     .if((value, { req }) => req.body.role === 'technician').notEmpty().withMessage("street is Required"),
    body("city") 
    .if((value, { req }) => req.body.role === 'technician').notEmpty().withMessage("city is Required"),
    body("pin_code") 
    .if((value, { req }) => req.body.role === 'technician').notEmpty().withMessage("pin_code is Required"),
    body("longitude") 
    .if((value, { req }) => req.body.role === 'technician').notEmpty().withMessage("longitude is Required"),
    body("latitude") 
    .if((value, { req }) => req.body.role === 'technician').notEmpty().withMessage("latitude is Required"),
    Validation
]

