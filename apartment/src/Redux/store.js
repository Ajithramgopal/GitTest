import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./IncrementSlice";
import addNumberReducer from "./ajithSlice";
import formDataReducer from "./anithaSlice";
export const store = configureStore({
  reducer: {
    add: dataReducer,
    adding: addNumberReducer,
    addUserData: formDataReducer,
  },
  devTools: true,
});

// console.log("dataReducer", dataReducer);
// console.log("addNumberReducer", addNumberReducer);
console.log("addUserData", formDataReducer);
