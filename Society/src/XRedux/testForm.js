import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.list.push(action.payload);
    },
    removeUser: (state, action) => {
      console.log(action.payload);
      //const filter=state.list.filter((action.payload) => action.payload=action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
