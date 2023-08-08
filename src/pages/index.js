import { lazy } from "react";

const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Cart = lazy(() => import("./Cart"));
const CheckOut = lazy(() => import("./CheckOut"));

export { Signup, Login, Home, Cart, CheckOut };
