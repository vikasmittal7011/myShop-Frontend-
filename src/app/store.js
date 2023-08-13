import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import alertReducer from "../features/alert/alertSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    alert: alertReducer,
    order: orderReducer,
  },
});
