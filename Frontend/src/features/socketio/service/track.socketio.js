import {io} from "socket.io-client"


export const InitializedTracksSocket=()=>{

  

  const newSocket=io("https://frpf-plumbing.onrender.com")
  console.log("Socket Data in APi layer",newSocket);
  return newSocket 


}