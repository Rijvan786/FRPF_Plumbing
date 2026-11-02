import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        images: [],
        item: [],
        services: [],
        selectedService: null,
        loading: false,
        error: null,
    },
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const {
    setImages,
    setItem,
    setServices,
    setSelectedService,
    setLoading,
    setError,
} = orderSlice.actions;

export default orderSlice.reducer;
