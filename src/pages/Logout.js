import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOut, selectauth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { brandOut } from "../features/brand/brandSlice";
import { cartOut } from "../features/cart/cartSlice";
import { cateOut } from "../features/category/categorySlice";
import { orderOut } from "../features/order/orderSlice";
import { productOut } from "../features/product/productSlice";
import { userOut } from "../features/user/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectauth);

  useEffect(() => {
    dispatch(authOut());
    dispatch(brandOut());
    dispatch(cartOut());
    dispatch(cateOut());
    dispatch(orderOut());
    dispatch(productOut());
    dispatch(userOut());
    navigate("/");
  }, [token, dispatch, navigate]);
};

export default Logout;
