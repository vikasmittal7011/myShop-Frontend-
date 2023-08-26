import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItem,
  fetchItemsByUser,
  resetCart,
  updateItem,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  message: "",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data.data;
  }
);

export const fetchItemsByUsertAsync = createAsyncThunk(
  "cart/fetchItemsByUser",
  async (id) => {
    const response = await fetchItemsByUser(id);
    return response.data.cart;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateItem",
  async (update) => {
    const response = await updateItem(update);
    return response.data.cart;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (itemId) => {
    const response = await deleteItem(itemId);
    return response.data.id;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    cartOut: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(fetchItemsByUsertAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUsertAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchItemsByUsertAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      });
  },
});

export const { clearMessage, cartOut } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
