import React from "react";

const Headings = ({ order }) => {
  return (
    <>
      <h1 className="font-bold text-2xl mb-3">Order Id: #{order.id}</h1>
      <h2 className="font-bold text-xl mb-3 text-green-500">
        Order Status: {order.status}
      </h2>
      <h2 className="font-bold text-xl mb-1 text-blue-400">
        Payment Mode: {order.paymentMethod}
      </h2>
    </>
  );
};

export default Headings;
