import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserByUsername = createAsyncThunk(
  "user/fetchUserByUsername",
  async (username) => {
    const response = await axios.get(
      `https://quack-be.vercel.app/api/v1/users/${username}`
    );
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://quack-be.vercel.app/api/v1/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByUsername.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserByUsername.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserByUsername.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.usersList = action.payload.users;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
