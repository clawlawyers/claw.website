import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const retrieveAuth = createAsyncThunk("auth/retrieveAuth", async () => {
  const storedAuth = localStorage.getItem("auth");
  if (storedAuth) {
    const parsedUser = await JSON.parse(storedAuth);
    if (parsedUser.expiresAt < new Date().valueOf()) return null;
    const props = await fetch(`${NODE_API_ENDPOINT}/client/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedUser.jwt}`,
      },
    });
    const parsedProps = await props.json();
    return {
      props: { ambassador: parsedProps.data.ambassador },
      user: parsedUser,
    };
  } else return null;
});

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    props: null,
    status: "idle",
    error: null,
  },
  reducers: {
    login(state, action) {
      const { ambassador, ...user } = action.payload;
      state.user = user;
      state.props = { ambassador };
      console.log(user);
      localStorage.setItem("auth", JSON.stringify(user));
      return;
    },
    logout(state) {
      state.user = null;
      state.props = null;
      localStorage.removeItem("auth");
      return;
    },
    gptUserCreated(state) {
      state.user.newGptUser = false;
      localStorage.setItem("auth", JSON.stringify(state));
      return;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveAuth.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(retrieveAuth.fulfilled, (state, action) => {
      if (action.payload && action.payload.props && action.payload.user) {
        state.props = action.payload.props;
        state.user = action.payload.user;
      }
      state.status = "succeeded";
    });
    builder.addCase(retrieveAuth.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { login, logout, gptUserCreated } = userSlice.actions;

export default userSlice.reducer;
