import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeAlert, setAlert } from "./alertAPI";

const initialState = {
  color: "",
  type: "",
  message: "",
};

export const setAlertAsync = createAsyncThunk(
  "alert/setAlert",
  async (item) => {
    const response = await setAlert(item);
    return response.data;
  }
);

export const removeAlertAsync = createAsyncThunk(
  "alert/removeAlert",
  async () => {
    const response = await removeAlert();
    return response.data;
  }
);

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAlertAsync.fulfilled, (state, action) => {
        state.color = action.meta.arg.color;
        state.message = action.meta.arg.message;
        state.type = action.meta.arg.type;
      })
      .addCase(removeAlertAsync.fulfilled, (state) => {
        state.color = "";
        state.message = "";
        state.type = "";
      });
  },
});

export const selectalert = (state) => state.alert;

export default alertSlice.reducer;
