import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const retrieveAuth = createAsyncThunk('auth/retrieveAuth', async () => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) return await JSON.parse(storedAuth);
    else return null;
});


export const userSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem('auth', JSON.stringify(action.payload));
            return;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('auth');
            return;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(retrieveAuth.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(retrieveAuth.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        })
        builder.addCase(retrieveAuth.rejected, (state) => {
            state.status = "failed";
        })
    }

});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;