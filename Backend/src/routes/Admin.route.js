import { Router } from "express";
import { AuthenticateAdmin, AuthenticateUser } from "../middleware/auth.middleware.js";
import { CreateServiceController, getTodaysRegisteredPlumbers } from "../controller/admin.controller.js";
import multer from "multer" 
import { CreateServiceValidation } from "../validator/createservice.validator.js";
const router= Router()

const upload=multer({storage:multer.memoryStorage(),
    limits:5*1024*1024
})

router.post("/createService",AuthenticateUser,AuthenticateAdmin,upload.array("Images",7),CreateServiceValidation,CreateServiceController)

router.get("/getTodayRegisterTechnicians",getTodaysRegisteredPlumbers)




export default router