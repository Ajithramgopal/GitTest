import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const fillingSlice = createSlice({
  name: "filling",
  initialState,
  reducers: {
    addFilling: (state, action) => {
      console.log("action.payload", action.payload);
    },
  },
});

export const { addFilling } = fillingSlice.actions;
export default fillingSlice.reducer;
