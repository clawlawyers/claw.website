import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const generateResponse = createAsyncThunk(
  "gpt/generateResponse",
  async ({ sessionId, model }, callback) => {
    const { auth, gpt } = callback.getState();

    const { jwt } = auth.user;
    const { prompt, token } = gpt;
    if (
      token.used.gptTokenUsed >= token.total.totalGptTokens ||
      token.used.gptTokenUsed + 1 > token.total.totalGptTokens
    )
      throw new Error("Not enough tokens, please upgrade or try again later!");
    const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session/prompt`, {
      method: "POST",
      body: JSON.stringify({ sessionId, prompt, model }),
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return await res.json();

    // else {
    //     const { prompt } = gpt;
    //     const res = await fetch(`${NODE_API_ENDPOINT}/gpt/conversation`, {
    //         method: "POST",
    //         body: JSON.stringify({ prompt }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     })
    //     return await res.json();
    // }
  }
);

export const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    status: "idle",
    prompt: null,
    response: null,
    relatedCases: {
      messageId: null,
      cases: [],
    },
    token: {
      used: {
        gptTokenUsed: null,
        caseSearchTokenUsed: null,
      },
      total: {
        totalGptTokens: null,
        totalCaseSearchTokens: null,
      },
    },
    plan: null,
    error: null,
  },
  reducers: {
    setGpt: (state, action) => {
      state.status = "idle";
      state.prompt = action.payload.prompt;
      state.response = null;
    },
    resetGpt: (state) => {
      state.response = null;
      state.status = "idle";
      state.prompt = null;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      // console.log(state);
    },
    setPlan: (state, action) => {
      state.plan = action.payload.plan;
    },
    setRelatedCases: (state, action) => {
      state.relatedCases.messageId = action.payload.messageId;
      state.relatedCases.cases = action.payload.cases;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      state.response = action.payload.data;
      state.token = action.payload.data?.token;
      state.status = "succeeded";
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const { resetGpt, setGpt, setPlan, setToken, setRelatedCases } =
  gptSlice.actions;

export default gptSlice.reducer;
