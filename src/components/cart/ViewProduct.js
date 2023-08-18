import React from "react";
import CartItems from "./CartItems";

const ViewProduct = ({ items }) => {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <CartItems items={items} />
      </div>
    </div>
  );
};

export default ViewProduct;
