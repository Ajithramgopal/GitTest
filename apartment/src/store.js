import { configureStore } from "@reduxjs/toolkit";
import userIncReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    userInfo: userIncReducer,
  },
  devTools: true,
});

console.log("userIncReducer", userIncReducer);
