import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for API call
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      console.log("state.list before:", state.list);
      console.log("payload:", action.payload);
      state.list.push(action.payload);
    },
    removeUser: (state, action) => {
      console.log("state.list before:", state.list);
      console.log("remove index:", action.payload);
      state.list = state.list.filter((_, index) => index !== action.payload);
    },
  },
  // ✅ `extraReducers` must be outside `reducers`
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
