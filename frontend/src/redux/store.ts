import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "../redux/demoSlice";

export const store = configureStore({
  reducer: {
    demoapicall: demoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
