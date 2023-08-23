import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Form from "../components/checkout/Form";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import { selectCart } from "../features/cart/cartSlice";
import { selectuser } from "../features/user/userSlice";
import { makeOrderAsync, selectorder } from "../features/order/orderSlice";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    items: { cart },
  } = useSelector(selectCart);
  const { userData } = useSelector(selectuser);
  const { orderPlaced } = useSelector(selectorder);

  const [paymentInfo, setPaymentInfo] = useState({
    address: "",
    paymentMethod: "",
  });

  const validate = (info) => {
    if (info.address === "") {
      setMessage("Select address...");
      return false;
    } else if (info.paymentMethod === "") {
      setMessage("Select payment method...");
      return false;
    } else {
      return true;
    }
  };

  const handlePaymentInfo = (id, info) => {
    setPaymentInfo({ ...paymentInfo, [id]: info });
    setMessage("");
  };

  const handleOrder = (totalItems, totalPrice) => {
    const valid = validate(paymentInfo);
    if (valid) {
      dispatch(
        makeOrderAsync({
          cart,
          totalItems,
          totalPrice,
          address: paymentInfo.address,
          paymentMethod: paymentInfo.paymentMethod,
          user: userData.id,
          status: "Pending",
        })
      );
    }
  };

  useEffect(() => {
    if (orderPlaced) {
      navigate("/order-success");
    }
  }, [orderPlaced, navigate]);

  useEffect(() => {
    if (cart.length < 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <NavBar>
        <Header heading="CheckOut Your Items" />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Form handlePaymentInfo={handlePaymentInfo} />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Product Information
              </h2>
              <ViewProduct items={cart} />
              <ViewTotal
                onClick={handleOrder}
                checkoutTitle="Pay Now"
                items={cart}
                message={message}
              />
            </div>
          </div>
        </div>
        <Footer />
      </NavBar>
    </>
  );
};

export default CheckOut;
