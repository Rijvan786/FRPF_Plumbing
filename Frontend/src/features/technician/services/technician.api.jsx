import axios from "axios"
const api=axios.create({
    baseURL:"https://frpf-plumbing.onrender.com/api/technician",
    withCredentials:true
})

      
export async function TechRegister({FullName,email,contact,password,role,experienceYears,street,city,pin_code,longitude,latitude}){
        
        const response=await api.post("/technicianRegister",{
            FullName,email,contact,password,role,experienceYears,street,city,pin_code,longitude,latitude
        })

        return response.data
      }