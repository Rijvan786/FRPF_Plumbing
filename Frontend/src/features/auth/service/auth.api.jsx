import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

      
export async function Register({FullName,email,contact,city,
      isVerifiedTech,
      experienceYears,
      role,
      password,}){
        
        const response=await api.post("/api/auth/register",{
            FullName,email,contact,city,isVerifiedTech,experienceYears,role,password
        })

        return response.data
      }


export async function Login({FullName,email,  password}){
  
    const  response=await api.post("/api/auth/login",{email, FullName, password})

    return response.data
}


export async function ResendMail({email}){
    
    const response=await api.post("/api/auth/resend-verification",{email})

    return response.data
}

export async function ForgetMail({email}){

    const response=await api.post("/api/auth/reset-password-mail",email)
     return response.data
}

export async function ForgetPassword({email,NewPassword}){
    
    const response=await api.patch("/api/auth/reset-password",
        {email,NewPassword}
    )
   return response.data
}

export async function Logout(){
    const response=await api.get("/api/auth/logout")

    return response
}

export async function GetMe(){
    const response=await api.get("/api/auth/get-me")
    console.log(response);
    return response.data
}

