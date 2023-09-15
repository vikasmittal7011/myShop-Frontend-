import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";

import "../stripe.css";
import PaymentInfo from "../components/payment/PaymentInfo";
import { selectorder } from "../features/order/orderSlice";
const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { orderPlaced } = useSelector(selectorder);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: orderPlaced.totalPrice,
        orderId: orderPlaced.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [orderPlaced]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentInfo />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
