import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";  // Manages authentication & user state
import apiReducer from "./slices/apiSlice";    // Manages API loading & error

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
  },
});

export default store;
