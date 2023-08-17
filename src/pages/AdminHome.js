import React from "react";
import NavBar from "./NavBar";
import Header from "../components/common/Header";
import { Filter } from "../components/home/Filter";

const AdminHome = () => {
  return (
    <>
      <NavBar>
        <Header heading="Welcome Admin" />
        <Filter />
      </NavBar>
    </>
  );
};

export default AdminHome;
