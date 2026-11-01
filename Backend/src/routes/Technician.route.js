import { Router } from "express";
import { GetCustomerController, 
         RegisterTechnicianController } from "../controller/Technician.controller.js";
import { RegisterValidator } from "../validator/auth.validator.js";

const router=Router()



router.post("/TechnicianRegister",RegisterValidator,RegisterTechnicianController)

router.post("/GetCustomerOrder",GetCustomerController)


export default router