import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
  const { loggedInUser } = useSelector(selectUser);

  if (!loggedInUser) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default Protect;
