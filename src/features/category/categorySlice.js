import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategory, fetchAllCategory } from "./categoryAPI";

const initialState = {
  category: [],
  status: "idle",
  message: "",
};

export const fetchAllCategoryAsync = createAsyncThunk(
  "category/fetchAllCategory",
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);

export const createCategoryAsync = createAsyncThunk(
  "category/createCategory",
  async (category) => {
    const response = await createCategory(category);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    cateOut: (state) => {
      state.category = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category.push(action.payload);
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload.category;
      });
  },
});

export const { clearMessage, cateOut } = categorySlice.actions;

export const selectCategory = (state) => state.category;

export default categorySlice.reducer;
