import ImageKit from "@imagekit/nodejs";
import { Config } from "../config/config.js";

const client=new ImageKit({
    privateKey:Config.IMAGE_KIT_API_KEY,

})

export const  uploadFile=async({buffer,fileName,folder="FRRF_Plumbing_Services"})=>{
    const result =await client.files.upload({
        file:await ImageKit.toFile(Buffer.from(buffer)),
        fileName,
        folder
    })
    return result
}