import { lazy } from "react";

const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Cart = lazy(() => import("./Cart"));

export { Signup, Login, Home, Cart };
