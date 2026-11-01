import { Server } from "socket.io";
import trackingHandler from "./trackinghandler.js";


let io
export async function Initfunction(httpServer){

    io =new Server(httpServer,{
        cors:{
            origin:["https://frpf-plumbing.onrender.com", "http://localhost:5173"],
            credentials:true
        }
    })
    console.log("socket is running");
  
    io.on("connect",(socket)=>{
        console.log("User is connected to server",socket.id);
    
    
   trackingHandler(io,socket)
    })
    
    return io
}
async function getIo(){
    if(!io){
        throw new Error("Error occurred not ready to connect socket io")
    }
    return io
}