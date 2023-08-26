import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, logoutUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  message: null,
  token: "",
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await loginUser(userData);
    return response.data;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async (id) => {
    const response = await logoutUser(id);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const { clearMessage } = authSlice.actions;

export const selectauth = (state) => state.auth;

export default authSlice.reducer;
