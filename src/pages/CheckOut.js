import React, { useEffect, useState } from "react";

import Header from "../components/common/Header";
import Form from "../components/checkout/Form";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { makeOrderAsync, selectorder } from "../features/order/orderSlice";
import { selectuser } from "../features/user/userSlice";
import NavBar from "./NavBar";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { items } = useSelector(selectCart);
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
          items,
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
    if (items.length < 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
              <ViewProduct products={items} />
              <ViewTotal
                onClick={handleOrder}
                checkoutTitle="Pay Now"
                products={items}
                message={message}
              />
            </div>
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default CheckOut;
