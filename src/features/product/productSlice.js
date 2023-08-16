import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrand,
  fetchAllCategory,
  fetchAllProduct,
  fetchProductByFilters,
  fetchProductById,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  category: [],
  brand: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
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
  },
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
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectProducts = (state) => state.product;

export default productSlice.reducer;
