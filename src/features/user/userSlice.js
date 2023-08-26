import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserData, fetchUserOrders, updateUser } from "./userAPI";

const initialState = {
  status: "idle",
  userOrders: [],
  userData: {},
  message: "",
};

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async ({ id, token }) => {
    const response = await fetchUserData(id, token);
    return response.data.user;
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
    return response.data.user;
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
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      })
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      });
  },
});

export const selectuser = (state) => state.user;

export default authSlice.reducer;
