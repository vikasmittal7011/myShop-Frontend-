import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, makeOrder, updateOrder } from "./orderAPI";

const initialState = {
  status: "idle",
  orders: [],
  orderPlaced: false,
  totalOrders: 0,
};

export const makeOrderAsync = createAsyncThunk(
  "order/makeOrder",
  async (order) => {
    const response = await makeOrder(order);
    return response.data.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pagination, sort }) => {
    const response = await fetchAllOrders(pagination, sort);

    return {
      orders: response.data.orders.orders,
      totalOrders: response.data.totalOrders,
    };
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderPlaced = false;
    },
    clearMessage: (state) => {
      state.message = "";
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
      })
      .addCase(makeOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
      });
  },
});

export const { resetOrder, clearMessage } = orderSlice.actions;

export const selectorder = (state) => state.order;

export default orderSlice.reducer;
