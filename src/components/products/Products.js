import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../common/Loader";
import {
  selectProducts,
  fetchAllProductsAsync,
} from "../../features/product/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status !== "idle") {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-12 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products?.map((product) => (
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
                  <Link to="product-details">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
