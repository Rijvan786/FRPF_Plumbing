import { configureStore } from "@reduxjs/toolkit";
import trackUser from "../features/socketio/state/track.slice.jsx";
import authReducer from "../features/auth/state/auth.slice.jsx";
import plumber_services from "../features/order/state/order.slice.jsx"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plumber_services:plumber_services,
    trackUser: trackUser,
  },
});
