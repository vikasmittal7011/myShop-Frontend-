import React, { Suspense, useEffect } from "react";
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
import Alert from "./components/common/Alert";
import { fetchItemsByUsertAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectauth } from "./features/auth/authSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrders from "./pages/UserOrders";

const App = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectauth);
  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchItemsByUsertAsync(loggedInUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser?.id]);
  return (
    <BrowserRouter>
      <NavBar />
      <Alert />
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
            path="/order-success"
            exact
            element={
              <Protect>
                <OrderSuccess />
              </Protect>
            }
          />
          <Route
            path="/user-orders"
            exact
            element={
              <Protect>
                <UserOrders />
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
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
