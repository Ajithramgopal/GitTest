import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
      console.log("state", state);
      console.log("action", action);
      console.log("payload", action.payload);
      console.log("slice", state.user);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
