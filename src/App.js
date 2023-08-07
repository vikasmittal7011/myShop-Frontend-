import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signin" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
