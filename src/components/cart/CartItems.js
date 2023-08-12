import React from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import Image from "../common/Image";
import { useDispatch } from "react-redux";
import {
  deleteItemAsync,
  updateItemAsync,
} from "../../features/cart/cartSlice";

const CartItems = ({ products }) => {
  const dispatch = useDispatch();
  const handleChange = (e, product) => {
    if (+e.target.value > 0) {
      const update = { ...product, quantity: +e.target.value };
      dispatch(updateItemAsync(update));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItemAsync(id));
  };

  return (
    <ul className="divide-y divide-gray-200">
      {products.map((product) => (
        <li key={product?.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <Image
              src={product?.thumbnail}
              alt={product?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <Link to={`/product-details/${product?.id}`}>
                    {product?.title}
                  </Link>
                </h3>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${" "}
                    {Math.round(
                      product?.price * (1 - product?.discountPercentage / 100)
                    )}
                  </p>
                  <p className="text-sm font-medium text-red-400 line-through">
                    $ {product?.price}
                  </p>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {product?.color || "Blue"}
              </p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">
                Qty{" "}
                <input
                  type="number"
                  className="w-20 rounded-md border-0 py-0.5 ml-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={product?.quantity}
                  onChange={(e) => {
                    handleChange(e, product);
                  }}
                />
              </p>

              <div className="flex">
                <Button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  type="button"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
