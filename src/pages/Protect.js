import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectuser } from "../features/user/userSlice";

const Protect = ({ children }) => {
  const { userData } = useSelector(selectuser);

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default Protect;
