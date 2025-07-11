import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      state.message = action.payload;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
});

export const { setLoading, setError, setSuccess, clearMessages } = apiSlice.actions;
export default apiSlice.reducer;
