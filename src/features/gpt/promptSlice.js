import { createSlice } from "@reduxjs/toolkit";

export const promptSlice = createSlice({
  name: "prompt",
  initialState: {
    prompts: [],
    loading: false,
    toggle: true,
    loadHistory: false,
  },

  reducers: {
    setPromptsArrAction(state, action) {
      const newArr = [...state.prompts, ...action.payload];
      state.prompts = newArr;
    },
    removePromptsArr(state, action) {
      state.prompts = [];
    },

    setPromptLoading(state, action) {
      state.loading = !state.loading;
    },
    setDataUsingIndex(state, action) {
      const { index, text } = action.payload;
      const promptsArr = [...state.prompts];
      promptsArr[index] = text;
      state.prompts = promptsArr;
    },
    setNewPromptData(state, action) {
      const promptArr = state.prompts;

      // Only update if there's at least one prompt
      if (promptArr.length > 0) {
        // Get the last prompt
        const lastPromptIndex = promptArr.length - 1;

        // Ensure text is initialized properly (default to an empty string if it's null or undefined)
        const currentText = promptArr[lastPromptIndex].text || ""; // Fallback to empty string if null/undefined

        // Append the new string to the last prompt's content
        promptArr[lastPromptIndex] = {
          ...promptArr[lastPromptIndex], // Retain existing properties
          text: currentText + action.payload.message, // Append the new string
        };
      }
    },
    setToggleMenu(state, action) {
      state.toggle = !state.toggle;
    },
    setPromptHistory(state, action) {
      state.loadHistory = !state.loadHistory;
    },
  },
});

export const {
  setPromptsArrAction,
  setPromptLoading,
  setNewPromptData,
  removePromptsArr,
  setDataUsingIndex,
  setToggleMenu,
  setPromptHistory,
} = promptSlice.actions;

export default promptSlice.reducer;
