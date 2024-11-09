import { createSlice } from "@reduxjs/toolkit";

export const promptSlice = createSlice({
  name: "prompt",
  initialState: {
    prompts: [],
    loading: false,
  },

  reducers: {
    setPromptsArr(state, action) {
      const newArr = [...state.prompts, ...action.payload]; // Assuming action.payload contains new prompts.
      state.prompts = newArr;
    },

    setPromptLoading(state, action) {
      state.loading = !state.loading;
    },

    setNewPromptData(state, action) {
      const promptArr = state.prompts;

      // Only update if there's at least one prompt
      if (promptArr.length > 0) {
        // Get the last prompt
        const lastPromptIndex = promptArr.length - 1;

        // Append the new string to the last prompt's content
        promptArr[lastPromptIndex] = {
          ...promptArr[lastPromptIndex], // Retain existing properties
          text: promptArr[lastPromptIndex].text + action.payload.message, // Append the new string
        };
      }
    },
  },
});

export const { setPromptsArr, setPromptLoading, setNewPromptData } =
  promptSlice.actions;

export default promptSlice.reducer;
