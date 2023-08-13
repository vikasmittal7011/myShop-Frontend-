import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userAPI";

const initialState = {
  status: "idle",
  userOrders: [],
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (userData) => {
    const response = await fetchUserOrders(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectuser = (state) => state.user;

export default authSlice.reducer;
