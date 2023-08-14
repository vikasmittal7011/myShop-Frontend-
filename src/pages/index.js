import { lazy } from "react";

const Protect = lazy(() => import("./Protect"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const OrderSuccess = lazy(() => import("./OrderSuccess"));
const UserProfile = lazy(() => import("./UserProfile"));
const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Cart = lazy(() => import("./Cart"));
const CheckOut = lazy(() => import("./CheckOut"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const UserOrders = lazy(() => import("./UserOrders"));

export {
  Signup,
  Login,
  Home,
  Cart,
  CheckOut,
  ProductDetails,
  UserOrders,
  Protect,
  PageNotFound,
  OrderSuccess,
  UserProfile,
};
