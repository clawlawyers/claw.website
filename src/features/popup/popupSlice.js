import { createSlice } from "@reduxjs/toolkit";

export const PopupSlice = createSlice({
    name: "popup",
    initialState: {
        open: false
    },

    reducers: {
        open(state) {
            state.open = true;
        },
        close(state) {
            state.open = false;
        }
    }
});

export const { open, close } = PopupSlice.actions;

export default PopupSlice.reducer;