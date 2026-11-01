import {io} from "socket.io-client"


export const InitializedTracksSocket=()=>{

  

  const newSocket=io("http://localhost:3000")
  console.log("Socket Data in APi layer",newSocket);
  return newSocket 


}