import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    giveAccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { giveAccess, logout } = userSlice.actions;

export default userSlice.reducer;
