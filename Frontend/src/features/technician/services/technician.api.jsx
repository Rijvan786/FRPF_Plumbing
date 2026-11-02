import axios from "axios"
const API_URL =  "https://frpf-plumbing.onrender.com"
const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

      
export async function TechRegister({FullName,email,contact,password,role,experienceYears,street,city,pin_code,longitude,latitude}){
        
        const response=await api.post("/api/technician/technicianRegister",{
            FullName,email,contact,password,role,experienceYears,street,city,pin_code,longitude,latitude
        })

        return response.data
      }