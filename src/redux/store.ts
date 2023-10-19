import { configureStore } from "@reduxjs/toolkit";
import { drawerReducer } from "./slices";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});
