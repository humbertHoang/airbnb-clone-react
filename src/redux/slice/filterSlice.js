import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tienNghi: [],
  romAndBed: [],
  giaPhong: {
    tu: undefined,
    den: undefined,
  },
  searchBar: "",
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
    },
    changeSearchBar: (state, action) => {
      state.searchBar = action.payload;
    }
  },
});

export const { changeTienNghi, resetFilter ,changRoomAndBed,changeGiaPhong,changeSearchBar } = filterSlice.actions;
export default filterSlice.reducer;
