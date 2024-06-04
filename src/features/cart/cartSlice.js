import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    plan: null,
    request: null,
    session: null,
    total: null,
    type: null,
  },

  reducers: {
    setCart(state, action) {
      state.plan = action.payload.plan;
      state.request = action.payload.request;
      state.session = action.payload.session;
      state.total = action.payload.total;
      state.type = action.payload.type;
    },
    resetCart(state, action) {
      state.plan = null;
      state.request = null;
      state.session = null;
      state.total = null;
    },
  },
});

export const { setCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
