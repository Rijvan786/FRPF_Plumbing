
import OrderModel from "../models/Order.model.js"
import ServiceModel from "../models/Service.model.js"
import { uploadFile } from "../service/storage.service.js";



export async function CreateOrderController(req,res){
   try{
 const {serviceId,issueDescription,amount,currency,
          label,street, city,pin_code ,longitude,latitude,scheduleDate}=req.body
          console.log(longitude,latitude);
          const userid=req.user.id

    console.log(serviceId);
      const service_Data=await ServiceModel.findById(serviceId)
      console.log(service_Data);
        
      if(!service_Data || !service_Data.isActive){
    
       
         res.status(404).json({
            message :"Service is not available"
         })

      }
  let  total_Amount
     // Full Setup and Renovation 
      if(amount && currency){  
        total_Amount=service_Data.price.amount + amount  
      }
   
   const Images =await Promise.all(req.files.map(async(file)=>{
      return  await uploadFile({
         buffer:file.buffer,
         fileName:file.originalname
      })
   }))
    const Booking= await OrderModel.create({
      userId:userid,

      ServiceDetails:{
         serviceName:service_Data.serviceName,
         category:service_Data.category,
         price:{
            amount:service_Data.price.amount,
            currency:service_Data.price.currency
         },
         serviceImg:service_Data.serviceImg,
        
     
  
      },
       issueDescription:issueDescription,
      issueImageUrl:Images,
      scheduleDate:scheduleDate,
      total_Amount:{
         
            amount:total_Amount || service_Data.price.amount ,
            currency:service_Data.price.currency || currency
      
      },
      address:{
         userId:req.user.id,  
         label:label,
         street:street,
         city:city,
         location:{
            type:"Point",
            coordinates:[longitude,latitude]
         },
         pin_code:pin_code
      }
    })


         res.status(201).json({
            message:"Order Created Successfully",
            order:Booking
         })
   }

   catch(err){

    console.log("Internal Server error:",err);
     res.status(500).json({
        message:"Internal Server error",
        error:err.message
     })
   }
}


// Basis on UserId
export async function GetOrderDetailController(req,res) {
   
    const order=await OrderModel.find({userId:req.user.id})


    res.status(200).json({
      message:"Order get Successfully",
      order
    })




}


export async function  GetAllServicesController(req,res) {
try {
        const services=await ServiceModel.find()

     res.status(200).json({
      message:"get All services Successfully",
      services
     })
} catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
      error
     })
}
}