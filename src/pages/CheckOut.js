import React from "react";

import Header from "../components/common/Header";
import Form from "../components/checkout/Form";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const CheckOut = () => {
  return (
    <>
      <Header heading="CheckOut Your Items" />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Form />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Product Information
            </h2>
            <ViewProduct products={products} />
            <ViewTotal afterCheckout="/payment" checkoutTitle="Pay Now"  />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
