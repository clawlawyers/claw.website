import { createSlice } from "@reduxjs/toolkit";

export const pricingSlice = createSlice({
  name: "price",
  initialState: {
    plan: null,
    planType: null,
    sessions: null,
    totalPrice: null,
    isDiscount: null,
    createdAt: null,
    // isUpgrade: null,
    trialDays: null,
    refferalCode: null,
    couponCode: null,
    refundAmount: null,
    existingSubscription: null,
  },

  reducers: {
    setPriceDetails(state, action) {
      state.plan = action.payload.plan;
      state.planType = action.payload.planType;
      state.sessions = action.payload.sessions;
      state.totalPrice = action.payload.totalPrice;
      state.isDiscount = action.payload.isDiscount;
      state.createdAt = action.payload.createdAt;
      // state.isUpgrade = action.payload.isUpgrade;
      state.trialDays = action.payload.trialDays;
      state.refferalCode = action.payload.refferalCode;
      state.couponCode = action.payload.couponCode;
      state.refundAmount = action.payload.refundAmount;
      state.existingSubscription = action.payload.existingSubscription;
    },
    resetPriceDetails(state, action) {
      state.plan = null;
      state.planType = null;
      state.sessions = null;
      state.totalPrice = null;
      state.isDiscount = null;
      state.createdAt = null;
      // state.isUpgrade = null;
      state.trialDays = null;
      state.refferalCode = null;
      state.couponCode = null;
      state.refundAmount = null;
    },
  },
});

export const { setPriceDetails, resetPriceDetails } = pricingSlice.actions;

export default pricingSlice.reducer;
