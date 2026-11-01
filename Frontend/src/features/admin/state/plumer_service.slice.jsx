import { createSlice } from "@reduxjs/toolkit";

const plumber_service_slice=createSlice({
    name:"plumber_service",
    initialState:{
         images:[]
    },
    reducers:{
     setImages:(state,action)=>{
        state.action=action.payload
     }
    }
})


export const {setImages}=plumber_service_slice.reducer

export default plumber_service_slice.actions