import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.products = action.payload;
    });
  },
});

export const { increment } = productSlice.actions;

export const selectProducts = (state) => state.product;

export default productSlice.reducer;
