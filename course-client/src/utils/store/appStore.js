import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import { api } from "./slice/apiSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default appStore;
