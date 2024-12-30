import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
    changeToken: (state, action) => {        
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { changeUser,changeToken, logoutUser} = userSlice.actions;
export default userSlice.reducer;
