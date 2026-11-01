import { InitializedTracksSocket } from "../service/track.socketio"
import {useDispatch} from "react-redux"
import {setSocket} from "../state/track.slice.jsx"
export const useTrackSocket=()=>{

const dispatch=useDispatch()
const handleTrackLocation =async()=>{
    const Location=await InitializedTracksSocket()
  console.log("Socket Data in custom hook",Location);
    
    dispatch(setSocket(Location))
}

    return {
        handleTrackLocation
    }
}