import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchProductByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

export const fetchProductByFiltersAsync = createAsyncThunk(
  "product/fetchProductByFilters",
  async ({ filters, sort, pagination }) => {
    const response = await fetchProductByFilters(filters, sort, pagination);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const selectProducts = (state) => state.product;

export default productSlice.reducer;
