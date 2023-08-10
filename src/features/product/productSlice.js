import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrand,
  fetchAllCategory,
  fetchAllProduct,
  fetchProductByFilters,
} from "./productAPI";

const initialState = {
  products: [],
  category: [],
  brand: [],
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

export const fetchAllCategoryAsync = createAsyncThunk(
  "category/fetchAllProduct",
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);

export const fetchAllBrandAsync = createAsyncThunk(
  "brand/fetchAllProduct",
  async () => {
    const response = await fetchAllBrand();
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
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brand = action.payload;
      });
  },
});

export const selectProducts = (state) => state.product;

export default productSlice.reducer;
