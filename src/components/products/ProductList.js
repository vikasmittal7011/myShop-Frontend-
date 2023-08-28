import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products?.map((product, i) => {
        return (
          <div key={i}>
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={process.env.REACT_APP_API + product?.thumbnail}
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
                  {product?.rating !== 0 && (
                    <>
                      <StarIcon className="w-5 h-5 mr-1 inline" />
                      <p className="text-sm text-gray-500 inline align-bottom">
                        {product?.rating}
                      </p>
                    </>
                  )}
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
              {product.stock <= 0 && (
                <p className="font-medium text-red-400">
                  Product is Out Of Stock
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
