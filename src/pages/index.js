import { lazy } from "react";

const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));

export { Signup, Login, Home };
