import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchListViTri = createAsyncThunk("fetchListViTri", async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/vi-tri`;
    const response = await axios({
        method: "GET",
        url: url,
        headers: {
            "tokenCybersoft": import.meta.env.VITE_TOKEN_CYBERSOFT,
        },
    });
    return response.data.content; 

})

const initialState = {
    listViTri: [],
    isLoading: false,
    isError: false
}
const viTriSlice = createSlice({
  name: 'vitri',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListViTri.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(fetchListViTri.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listViTri = action.payload;
    }).addCase(fetchListViTri.rejected, (state, action) => {
        state.isError = true;
    })
  }
});

export const {  } = viTriSlice.actions;
export default viTriSlice.reducer;