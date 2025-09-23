import { createSlice } from "@reduxjs/toolkit";

const IncrementSlice = createSlice({
  name: "data",
  initialState: {
    data: 0,
  },
  reducers: {
    addIncrement: (state, action) => {
      // Increment by payload if provided, else +1
      //   state.data += action.payload ?? 1;
      state.data = state.data + action.payload;
      console.log("New state value:", state.data);
    },
  },
});

export const { addIncrement } = IncrementSlice.actions;
export default IncrementSlice.reducer;
