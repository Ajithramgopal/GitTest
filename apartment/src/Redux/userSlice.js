// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    addUsers: (state, action) => {
      console.log("redux-state", state);
      console.log("action", action);
      console.log("payload", action.payload);
      console.log("user", state.user);
      state.user.push(action.payload); // ✅ actually add data
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
