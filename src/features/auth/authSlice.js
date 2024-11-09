import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { generateResponse, retrieveActivePlanUser } from "../gpt/gptSlice";

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
    autologout:false,
    error: null,

  },
  reducers: {
    login(state, action) {
      const { ambassador, ...user } = action.payload;
      state.user = user;
      state.props = { ambassador };
      state.autologout = false;
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
    setAutoLogout(state){
      state.autologout = true;
    }
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
    builder.addCase(generateResponse.fulfilled, (state, action)=>{
     if(action.payload==401){
      console.log("hi")
      state.autologout = true;
      state.user = null;
      state.props = null;
      localStorage.removeItem("auth");
    
     }
     
  
    })
    // builder.addCase(retrieveActivePlanUser.fulfilled, (state, action)=>{
    //  if(action.payload==401){
    //   console.log("hi")
    //   state.autologout = true;
    //   state.user = null;
    //   state.props = null;
    //   localStorage.removeItem("auth");
    
    //  }
     
  
    // })
  },
});

export const { login, logout, gptUserCreated , setAutoLogout } = userSlice.actions;

export default userSlice.reducer;
