import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectuser } from "../features/user/userSlice";
import { selectauth } from "../features/auth/authSlice";

const AdminProtect = ({ children }) => {
  const { userData } = useSelector(selectuser);
  const { token } = useSelector(selectauth);

  if (!userData || !token) {
    return <Navigate to="/signin" />;
  }

  if (userData.role === "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtect;
