import { configureStore } from "@reduxjs/toolkit";
import { bookingApi } from "./api/bookingApi";
import { locationApi } from "./api/locationApi";
import { roomApi } from "./api/roomApi";
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
    [locationApi.reducerPath]: locationApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      locationApi.middleware,
      roomApi.middleware,
      bookingApi.middleware,
    ),
  devTools: true, // SHOULD BE "false" IN PRODUCTION!!!
});
