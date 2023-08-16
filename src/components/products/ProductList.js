import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { updateProductAsync } from "../../features/product/productSlice";

const ProductList = ({ products, loggedInUser }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const index = products.findIndex((product) => product.id === id);
    const product = { ...products[index] };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products?.map((product) => (
        <div className={product?.deleted && "pointer-events-none"}>
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product?.thumbnail}
                alt={product?.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`product-details/${product.id}`}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 w-50"
                    />
                    {product?.title?.length >= 25
                      ? product?.title?.slice(0, 25) + "...`"
                      : product?.title}
                  </Link>
                </h3>
                <StarIcon className="w-5 h-5 mr-1 inline" />
                <p className="text-sm text-gray-500 inline align-bottom">
                  {product?.rating}
                </p>
              </div>
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
            {product.deleted && (
              <p className="absolute top-0 left-2 text-md font-bold text-red-400 my-2">
                This Product was Removed
              </p>
            )}
          </div>
          {loggedInUser?.role === "admin" && (
            <div className="flex justify-between my-3">
              <Button
                onClick={() => {
                  handleDelete(product.id);
                }}
                className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-red-700"
                type="button"
              >
                Remove
              </Button>
              <Link
                to={`/edit-product/${product.id}`}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                type="button"
              >
                Update
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
