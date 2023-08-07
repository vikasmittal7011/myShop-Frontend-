import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./pages/NavBar";
import { Home, Login, Signup, Cart } from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
