import { createSlice } from "@reduxjs/toolkit";

const trackSlice=createSlice({
    name:"trackUser",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }

    
})

export  const {setSocket}=trackSlice.actions

export default trackSlice.reducer