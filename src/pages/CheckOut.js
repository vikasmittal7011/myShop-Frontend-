import React, { useEffect, useState } from "react";

import Header from "../components/common/Header";
import Form from "../components/checkout/Form";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { items } = useSelector(selectCart);

  const [paymentInfo, setPaymentInfo] = useState({
    address: "",
    paymentMethod: "",
  });

  const handlePaymentInfo = (id, info) => {
    setPaymentInfo({ ...paymentInfo, [id]: info });
    console.log(id, info);
  };

  useEffect(() => {
    if (items.length < 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
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
              afterCheckout="/payment"
              checkoutTitle="Pay Now"
              products={items}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
