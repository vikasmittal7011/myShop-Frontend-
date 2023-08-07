import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./pages/NavBar";
import { Login, Signup } from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
