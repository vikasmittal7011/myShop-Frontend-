import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReviews, postReview } from "./reviewAPI";

const initialState = {
  reviews: [],
  status: "idle",
  message: "",
};

export const postReviewAsync = createAsyncThunk(
  "cart/postReview",
  async (review) => {
    const response = await postReview(review);
    return response.data.review;
  }
);

export const fetchReviewsAsync = createAsyncThunk(
  "cart/fetchItemsByUser",
  async (id) => {
    const response = await fetchReviews(id);
    return response.data.reviews;
  }
);

export const updateAsync = createAsyncThunk(
  "cart/updateItem",
  async (update) => {
    // const response = await updateItem(update);
    // return response.data.cart;
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    reviewOut: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews.push(action.payload);
      })
      .addCase(postReviewAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(fetchReviewsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(updateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      });
  },
});

export const { clearMessage, reviewOut } = reviewSlice.actions;

export const selectReview = (state) => state.review;

export default reviewSlice.reducer;
