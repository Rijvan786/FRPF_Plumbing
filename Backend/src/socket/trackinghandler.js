

 async function trackingHandler(params) {
    
//1
      socket.on('join_booking',(booking_id)=>{
        socket.join(booking_id)
        console.log(`join_booking`);
     })
  
     //2
     socket.on('send_location',(data)=>{
        const {booking_id,latitude,longitude}=data
     console.log(`✅ User is joined room ${booking_id}`);
     
      socket.to(booking_id).emit("receive_location",{latitude,longitude})
     })

      // 3 

   
     socket.on("disconnect",()=>{
        console.log('User is disconnected');
     })
}

export default trackingHandler