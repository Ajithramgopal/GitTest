import { createSlice } from "@reduxjs/toolkit";

const anithaSlice = createSlice({
  name: "formData",
  initialState: {
    formData: [],
  },
  reducers: {
    addUser: (state, action) => {
      console.log("state", state.formData);
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.formData.push(action.payload);
    },
    removeUser: (state, action) => {
      //   state.formData = state.formData.filter(
      //     (user) => user.userId != action.payload
      //   );
    },
  },
});

export const { addUser, removeUser } = anithaSlice.actions;
export default anithaSlice.reducer;
