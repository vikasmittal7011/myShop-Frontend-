import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeOrder } from "./prderAPI";

const initialState = {
  status: "idle",
  orders: [],
  orderPlaced: false,
};

export const makeOrderAsync = createAsyncThunk(
  "order/makeOrder",
  async (order) => {
    const response = await makeOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderPlaced = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
        state.orderPlaced = true;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectorder = (state) => state.order;

export default orderSlice.reducer;
