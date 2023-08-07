import React from "react";
import Header from "../components/common/Header";
import { Filter } from "../components/home/Filter";

const Home = () => {
  return (
    <>
      <Header heading="Products" />
      <Filter />
    </>
  );
};

export default Home;
