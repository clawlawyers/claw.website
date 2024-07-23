// src/redux/splashSlice.js

import { createSlice } from "@reduxjs/toolkit";

const splashSlice = createSlice({
  name: "splash",
  initialState: {
    hasSeenSplash: false,
  },
  reducers: {
    setHasSeenSplash: (state) => {
      state.hasSeenSplash = true;
    },
    resetHasSeenSplash: (state) => {
      state.hasSeenSplash = false;
    },
  },
});

export const { setHasSeenSplash, resetHasSeenSplash } = splashSlice.actions;
export default splashSlice.reducer;
