import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserData, fetchUserOrders, updateUser } from "./userAPI";

const initialState = {
  status: "idle",
  userOrders: [],
  userData: {},
};

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (userData) => {
    const response = await fetchUserData(userData);
    return response.data;
  }
);

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (userData) => {
    const response = await fetchUserOrders(userData);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      });
  },
});

export const selectuser = (state) => state.user;

export default authSlice.reducer;
