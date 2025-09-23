import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userInc",
  initialState: 0, // just a number
  reducers: {
    addInc: (state, action) => {
      return state + action.payload; // ✅ replace with new number
    },
  },
});

export const { addInc } = userSlice.actions;
export default userSlice.reducer;
