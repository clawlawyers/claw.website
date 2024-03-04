import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        current: null
    },
    reducers: {
        login(state, action) {
            state.current = action.payload;
            return;
        },
        logout(state) {
            state.current = null;
            return;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;