import React from "react";
import Header from "../components/common/Header";
import { Filter } from "../components/home/Filter";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <>
      <NavBar>
        <Header heading="Products" />
        <Filter />
      </NavBar>
    </>
  );
};

export default Home;
