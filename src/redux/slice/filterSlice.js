import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tienNghi: [],
  romAndBed: [],
  giaPhong: {
    tu: undefined,
    den: undefined,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeTienNghi: (state, action) => {
      state.tienNghi = action.payload;
    },
    changRoomAndBed: (state, action) => {
      state.romAndBed = action.payload;
    },
    resetFilter: () => {
      return initialState;
    },
    changeGiaPhong: (state, action) => {
      state.giaPhong = action.payload;
    }
  },
});

export const { changeTienNghi, resetFilter ,changRoomAndBed,changeGiaPhong } = filterSlice.actions;
export default filterSlice.reducer;
