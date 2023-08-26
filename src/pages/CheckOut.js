import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Form from "../components/checkout/Form";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import { selectCart } from "../features/cart/cartSlice";
import { clearMessage, selectuser } from "../features/user/userSlice";
import {
  clearMessage as oderClearMessage,
  makeOrderAsync,
  selectorder,
} from "../features/order/orderSlice";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { items } = useSelector(selectCart);
  const { userData, message: userMessage } = useSelector(selectuser);
  const { orderPlaced, message: orderMessage } = useSelector(selectorder);

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
      const newOrder = {
        items,
        totalItems,
        totalPrice,
        address: paymentInfo.address,
        paymentMethod: paymentInfo.paymentMethod,
        user: userData.id,
        status: "Pending",
      };
      dispatch(makeOrderAsync(newOrder));
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

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [userMessage?.message, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(oderClearMessage());
    }, 4000);
  }, [orderMessage?.message, dispatch]);

  return (
    <>
      <NavBar>
        <Header heading="CheckOut Your Items" />
        <p className="text-red-600 my-3 font-bold text-2xl capitalize">
          {userMessage?.message}
        </p>
        <p className="text-red-600 my-3 font-bold text-2xl capitalize">
          {orderMessage?.message}
        </p>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Form handlePaymentInfo={handlePaymentInfo} />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Product Information
              </h2>
              <ViewProduct items={items} />
              <ViewTotal
                onClick={handleOrder}
                checkoutTitle="Pay Now"
                items={items}
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
