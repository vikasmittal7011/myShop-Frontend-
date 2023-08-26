import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectuser } from "../features/user/userSlice";

const AdminProtect = ({ children }) => {
  const { userData } = useSelector(selectuser);

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  if (userData.role === "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtect;
