// your work is only run server and connect to the database

import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"
import http from "http"
import { Initfunction } from "./src/socket/server.socket.js"
const httpServer=http.createServer(app)

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000")
   
})

Initfunction(httpServer)
connectDB()
