import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchListPhong = createAsyncThunk("fetchListPhong", async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/phong-thue`;
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
    listPhong: [],
    isLoading: false,
    isError: false
}
const phongSlice = createSlice({
  name: 'phong',
  initialState,
  reducers: {
    getListPhong : (state,action) => {
        return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListPhong.pending, (state, action) => {
        state.isLoading = true;
    }).addCase(fetchListPhong.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listPhong = action.payload;
    }).addCase(fetchListPhong.rejected, (state, action) => {
        state.isError = true;
    })
  }
});

export const {  } = phongSlice.actions;
export default phongSlice.reducer;