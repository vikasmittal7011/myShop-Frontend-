import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  AdminHome,
  CreateBrand,
  CreateCategory,
} from "./pages/index";
import Loader from "./components/common/Loader";
// import { fetchItemsByUsertAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectauth } from "./features/auth/authSlice";
import { fetchUserDataAsync } from "./features/user/userSlice";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const App = () => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useSelector(selectauth);

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT,
  };

  useEffect(() => {
    if (loggedInUser) {
      // dispatch(fetchItemsByUsertAsync(loggedInUser.id));
      dispatch(fetchUserDataAsync({ id: loggedInUser.id, token }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser?.id]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Provider template={AlertTemplate} {...options}>
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
              path="/admin-home"
              exact
              element={
                <AdminProtect>
                  <AdminHome />
                </AdminProtect>
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
              path="/create-brand"
              exact
              element={
                <AdminProtect>
                  <CreateBrand />
                </AdminProtect>
              }
            />
            <Route
              path="/create-category"
              exact
              element={
                <AdminProtect>
                  <CreateCategory />
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
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
