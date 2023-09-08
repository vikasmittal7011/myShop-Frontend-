import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, forgetPasswordRequest, loginUser } from "./authAPI";

const initialState = {
  status: "idle",
  message: null,
  token: localStorage.getItem("token") || "",
  sendMail: false,
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

export const forgetPasswordRequestAsync = createAsyncThunk(
  "auth/forgetPasswordRequest",
  async (mail) => {
    const response = await forgetPasswordRequest(mail);
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
    authOut: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
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
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(forgetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sendMail = true;
      })
      .addCase(forgetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      });
  },
});

export const { clearMessage, authOut } = authSlice.actions;

export const selectauth = (state) => state.auth;

export default authSlice.reducer;
