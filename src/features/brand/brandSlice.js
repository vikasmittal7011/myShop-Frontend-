import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBrand, fetchAllBrand } from "./brandAPI";

const initialState = {
  brand: [],
  status: "idle",
  message: "",
};

export const fetchAllBrandAsync = createAsyncThunk(
  "brand/fetchAllBrand",
  async () => {
    const response = await fetchAllBrand();
    return response.data;
  }
);

export const createBrandAsync = createAsyncThunk(
  "brand/createBrand",
  async (brand) => {
    const response = await createBrand(brand);
    return response.data;
  }
);

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    brandOut: (state) => {
      state.brand = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brand.push(action.payload);
      })
      .addCase(createBrandAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brand = action.payload.brand;
      });
  },
});

export const { clearMessage, brandOut } = brandSlice.actions;

export const selectBrand = (state) => state.brand;

export default brandSlice.reducer;
