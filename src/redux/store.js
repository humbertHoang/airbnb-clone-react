import { configureStore } from "@reduxjs/toolkit";
import phongSlice from './slice/phongSlice';
import filterSlice from './slice/filterSlice'
import viTriSlice from './slice/viTriSlice';
import userSlice from './slice/userSlice';
export const store = configureStore({
    reducer: {
        phong: phongSlice,
        filter: filterSlice,
        viTri : viTriSlice,
        user: userSlice
    },
});