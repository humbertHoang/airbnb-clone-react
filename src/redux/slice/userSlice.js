import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token:""
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
  },
});

export const { changeUser,changeToken} = userSlice.actions;
export default userSlice.reducer;
