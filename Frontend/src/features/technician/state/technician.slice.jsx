import { createSlice } from "@reduxjs/toolkit";

const TechnicianSlice = createSlice({
    name: "technician",
    initialState: {
        technician: null,
        profile: null,
        loading: false,
        error: null,
        isOnline: false,
    },
    reducers: {
        setTechnician: (state, action) => {
            state.technician = action.payload;
        },
        setTechnicianProfile: (state, action) => {
            state.profile = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setIsOnline: (state, action) => {
            state.isOnline = action.payload;
        },
    },
});

export const {
    setTechnician,
    setTechnicianProfile,
    setLoading,
    setError,
    setIsOnline,
} = TechnicianSlice.actions;

export default TechnicianSlice.reducer;
