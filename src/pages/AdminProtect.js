import React from "react";
import { useSelector } from "react-redux";
import { selectauth } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const AdminProtect = ({ children }) => {
  const { loggedInUser } = useSelector(selectauth);

  if (!loggedInUser) {
    return <Navigate to="/signin" />;
  }

  if (loggedInUser.role === "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtect;
