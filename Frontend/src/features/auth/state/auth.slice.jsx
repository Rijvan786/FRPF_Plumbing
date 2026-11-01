import { createSlice } from "@reduxjs/toolkit";

const getSavedUser = () => {
    try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const Authslice = createSlice({
    name: "auth",
    initialState: {
        User: null,
        Error: null,
        Loading: true
    },

    reducers: {
        setUser: (state, action) => {
            state.User = action.payload;
            
        },
        setError: (state, action) => {
            state.Error = action.payload;
        },
        setLoading: (state, action) => {
            state.Loading = action.payload;
        }
    }
});

export const { setUser, setError, setLoading } = Authslice.actions;

export default Authslice.reducer;
