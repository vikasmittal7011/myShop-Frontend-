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
import Protect from "./pages/Protect";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Protect>
                <Home />
              </Protect>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <Protect>
                <Cart />
              </Protect>
            }
          />
          <Route
            path="/checkOut"
            exact
            element={
              <Protect>
                <CheckOut />
              </Protect>
            }
          />
          <Route
            path="/product-details/:id"
            exact
            element={
              <Protect>
                <ProductDetails />
              </Protect>
            }
          />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="*" exact element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
