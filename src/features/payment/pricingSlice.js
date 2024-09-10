import { createSlice } from "@reduxjs/toolkit";

export const pricingSlice = createSlice({
  name: "price",
  initialState: {
    plan: null,
    planType: null,
    sessions: null,
    totalPrice: null,
    // caseSearch: null,
    discount: null,
    createdAt: null,
    isUpgrade: null,
  },

  reducers: {
    setPriceDetails(state, action) {
      state.plan = action.payload.plan;
      state.planType = action.payload.planType;
      state.sessions = action.payload.sessions;
      state.totalPrice = action.payload.totalPrice;
      //   state.caseSearch = action.payload.caseSearch;
      state.discount = action.payload.discount;
      state.createdAt = action.payload.createdAt;
      state.isUpgrade = action.payload.isUpgrade;
    },
    resetPriceDetails(state, action) {
      state.plan = null;
      state.planType = null;
      state.sessions = null;
      state.totalPrice = null;
      //   state.caseSearch = null;
      state.discount = null;
      state.createdAt = null;
      state.isUpgrade = null;
    },
  },
});

export const { setPriceDetails, resetPriceDetails } = pricingSlice.actions;

export default pricingSlice.reducer;
