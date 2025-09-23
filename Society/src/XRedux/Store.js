import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";
import fillingReducer from "./fillingSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    filling: fillingReducer,
  },
  devTools: true,
  name: "My Redux App", // shows a custom name in DevTools
  trace: true, // lets you trace actions
  traceLimit: 25, // ✅ Force enable
});

export default store;
