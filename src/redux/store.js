import { configureStore } from "@reduxjs/toolkit";
import phongSlice from './slice/phongSlice';
import filterSlice from './slice/filterSlice'
import viTriSlice from './slice/viTriSlice';
export const store = configureStore({
    reducer: {
        phong: phongSlice,
        filter: filterSlice,
        viTri : viTriSlice
    },
});