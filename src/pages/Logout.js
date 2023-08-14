import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectauth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector(selectauth);

  useEffect(() => {
    dispatch(logoutUserAsync(loggedInUser.id));
    navigate("/");
  }, [loggedInUser.id, dispatch, navigate]);
};

export default Logout;
