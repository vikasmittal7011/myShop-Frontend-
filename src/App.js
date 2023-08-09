import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./pages/NavBar";
import {
  Home,
  Login,
  Signup,
  Cart,
  CheckOut,
  ProductDetails,
} from "./pages/index";
import Loader from "./components/common/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkOut" exact element={<CheckOut />} />
          <Route path="/product-details" exact element={<ProductDetails />} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
