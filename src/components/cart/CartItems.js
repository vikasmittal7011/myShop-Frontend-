import React from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import Image from "../common/Image";

const CartItems = ({ products }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {products.map((product) => (
        <li key={product.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <Link to={product.href}>{product.name}</Link>
                </h3>
                <p className="ml-4">{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">
                Qty{" "}
                <input
                  type="number"
                  className="w-20 rounded-md border-0 py-0.5 ml-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={1}
                />
              </p>

              <div className="flex">
                <Button
                  name="Remove"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  type="button"
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
