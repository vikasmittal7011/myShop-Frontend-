import React from "react";
import CartItems from "./CartItems";

const ViewProduct = ({ products }) => {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <CartItems products={products} />
      </div>
    </div>
  );
};

export default ViewProduct;
