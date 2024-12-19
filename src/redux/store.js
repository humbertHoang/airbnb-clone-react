import { configureStore } from "@reduxjs/toolkit";
import phongSlice from './slice/phongSlice';
import filterSlice from './slice/filterSlice'
export const store = configureStore({
    reducer: {
        phong: phongSlice,
        filter: filterSlice,
    },
});