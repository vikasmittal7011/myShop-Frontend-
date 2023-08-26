import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchProductByFilters,
  fetchProductById,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
  message: "",
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
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

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    productOut: (state) => {
      state.products = [];
      state.totalItems = 0;
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByFiltersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.error;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.error;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.products.push(action.payload.data);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products.products[index] = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload.error;
      });
  },
});

export const { clearSelectedProduct, clearMessage, productOut } =
  productSlice.actions;

export const selectProducts = (state) => state.product;

export default productSlice.reducer;
