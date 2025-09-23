import { createSlice } from "@reduxjs/toolkit";

const ajithSlice = createSlice({
  name: "addNumber",
  initialState: {
    addNumber: 0,
  },
  reducers: {
    addingCount: (state, action) => {
      console.log("state", state.addNumber);
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.addNumber = state.addNumber + action.payload;
    },
    decrementCount: (state, action) => {
      console.log("state", state.addNumber);
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.addNumber = state.addNumber - action.payload;
    },
  },
});

export const { addingCount, decrementCount } = ajithSlice.actions;
export default ajithSlice.reducer;
