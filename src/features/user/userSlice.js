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
  async (token) => {
    const response = await fetchUserData(token);
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
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    userOut: (state) => {
      state.userOrders = [];
      state.userData = {};
    },
  },
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
        state.message = action.payload;
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
        state.message = action.payload;
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
        state.message = action.payload;
      });
  },
});

export const { clearMessage, userOut } = userSlice.actions;

export const selectuser = (state) => state.user;

export default userSlice.reducer;
