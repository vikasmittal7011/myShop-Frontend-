import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import alerlReducer from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    alert: alerlReducer,
  },
});
