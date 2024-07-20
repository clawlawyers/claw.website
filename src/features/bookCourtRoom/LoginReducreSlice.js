import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux store
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token:'',
    userId:'',
    caseOverview:'',
    
  },
  reducers: {
    setUser: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.loginTime = action.payload.loginTime;
    },
  },
});

// Export the action creators
export const { setUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
