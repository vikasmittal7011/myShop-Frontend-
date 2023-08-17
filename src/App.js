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
  Protect,
  PageNotFound,
  OrderSuccess,
  UserProfile,
  UserOrders,
  Logout,
  ForgotPassword,
  ProductCreateForm,
  AdminProtect,
  AdminOrders,
} from "./pages/index";
import Loader from "./components/common/Loader";
import Alert from "./components/common/Alert";
import { fetchItemsByUsertAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectauth } from "./features/auth/authSlice";
import { fetchUserDataAsync } from "./features/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectauth);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchItemsByUsertAsync(loggedInUser.id));
      dispatch(fetchUserDataAsync(loggedInUser.id));
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
            path="/user-profile"
            exact
            element={
              <Protect>
                <UserProfile />
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
            path="/logout"
            exact
            element={
              <Protect>
                <Logout />
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
          <Route
            path="/create-product"
            exact
            element={
              <AdminProtect>
                <ProductCreateForm />
              </AdminProtect>
            }
          />
          <Route
            path="/edit-product/:id"
            exact
            element={
              <AdminProtect>
                <ProductCreateForm />
              </AdminProtect>
            }
          />
          <Route
            path="/admin-orders"
            exact
            element={
              <AdminProtect>
                <AdminOrders />
              </AdminProtect>
            }
          />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
