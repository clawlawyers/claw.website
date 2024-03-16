import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";


export const generateResponse = createAsyncThunk('gpt/generateResponse', async ({ sessionId, model }, callback) => {
    const { auth, gpt } = callback.getState();

    const { jwt } = auth.user;
    const { prompt } = gpt;
    const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session/prompt`, {
        method: "POST",
        body: JSON.stringify({ sessionId, prompt, model }),
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        }
    })
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
});


export const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        status: "idle",
        prompt: null,
        response: null
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateResponse.pending, (state) => {
            state.status = "pending";
        })
        builder.addCase(generateResponse.fulfilled, (state, action) => {
            state.response = action.payload.data?.gptResponse?.message;
            state.status = "succeeded";
        })
        builder.addCase(generateResponse.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const { resetGpt, setGpt } = gptSlice.actions;

export default gptSlice.reducer;