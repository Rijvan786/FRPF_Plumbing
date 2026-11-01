import { createSlice } from "@reduxjs/toolkit";

const plumber_service_slice = createSlice({
    name: "plumber_service",
    initialState: {
        images: [],
        item: []
    },
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        }
    }
});

export const { setImages, setItem } = plumber_service_slice.actions;

export default plumber_service_slice.reducer;
