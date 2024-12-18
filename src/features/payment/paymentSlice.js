import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const retrieveActiveAdiraPlan = createAsyncThunk(
  "payments/retrieveAdiraPlan",
  async () => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedUser = JSON.parse(storedAuth);
      const props = await fetch(
        `${NODE_API_ENDPOINT}/ai-drafter/retrive-adira_plan`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedUser.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      const parsedProps = await props.json();
      // console.log(parsedProps.plan);
      return {
        activePlan: parsedProps.plan,
      };
    } else return null;
  }
);

export const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    plan: null,
    activePlan: null,
    status: "idle",
    talkToExpertData: null,
  },

  reducers: {
    setPaymentDetails(state, action) {
      state.plan = action.payload;
    },
    resetPaymentDetails(state, action) {
      state.plan = null;
    },
    setTalkToExpert(state, action) {
      state.talkToExpertData = action.payload;
    },
    resetTalkToExpert(state, action) {
      state.talkToExpertData = action.payload;
    },
    setActivePlanDetails(state, action) {
      state.activePlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveActiveAdiraPlan.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(retrieveActiveAdiraPlan.fulfilled, (state, action) => {
      if (action.payload && action.payload.activePlan) {
        state.activePlan = action.payload.activePlan;
      }
      state.status = "succeeded";
    });
    builder.addCase(retrieveActiveAdiraPlan.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {
  setPaymentDetails,
  resetPaymentDetails,
  setActivePlanDetails,
  setTalkToExpert,
  resetTalkToExpert,
} = paymentSlice.actions;

export default paymentSlice.reducer;
