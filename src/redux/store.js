import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import filterSlice from "./slice/filterSlice";
import phongSlice from "./slice/phongSlice";
import userSlice from "./slice/userSlice";
import viTriSlice from "./slice/viTriSlice";

export const store = configureStore({
  reducer: {
    phong: phongSlice,
    filter: filterSlice,
    viTri: viTriSlice,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
