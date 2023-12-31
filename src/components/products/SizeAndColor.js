import { RadioGroup } from "@headlessui/react";
import { useAlert } from "react-alert";

import { classNames } from "../../utils/constant";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  fetchItemsByUsertAsync,
  selectCart,
} from "../../features/cart/cartSlice";
import { selectuser } from "../../features/user/userSlice";
import { useState } from "react";

const SizeAndColor = ({
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  productData,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const alert = useAlert();
  const { userData } = useSelector(selectuser);
  const { items } = useSelector(selectCart);

  const handleClick = (w) => {
    w.preventDefault();
    if (items.findIndex((item) => item.item.id === productData.id) < 0) {
      const newItem = {
        item: productData.id,
        quantity: 1,
      };
      if (productData.colors.length > 0) {
        if (selectedColor) {
          newItem.color = selectedColor;
        } else {
          setError("Select color first");
          return;
        }
      }
      if (productData.sizes.length > 0) {
        if (selectedSize) {
          newItem.size = selectedSize;
        } else {
          setError("Select size first");
          return;
        }
      }
      dispatch(addToCartAsync(newItem));
      dispatch(fetchItemsByUsertAsync());
      alert.success("Item is successfully add to your cart");
    } else {
      alert.error("Item is already added to your cart");
    }
  };

  return (
    <>
      <form className="mt-10">
        {productData?.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>

            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="mt-4"
            >
              <div className="flex items-center space-x-3">
                {productData?.colors?.map((color) => (
                  <RadioGroup.Option
                    key={color.name}
                    value={color}
                    className={({ active, checked }) =>
                      classNames(
                        color.selectedClass,
                        active && checked ? "ring ring-offset-1" : "",
                        !active && checked ? "ring-2" : "",
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      )
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        color.class,
                        "h-8 w-8 rounded-full border border-black border-opacity-10"
                      )}
                    />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {productData?.sizes.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
            </div>

            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="mt-4"
            >
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {productData?.sizes?.map((size) => (
                  <RadioGroup.Option
                    key={size.name}
                    value={size}
                    disabled={!size.inStock}
                    className={({ active }) =>
                      classNames(
                        size.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-indigo-500" : "",
                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">
                          {size.name}
                        </RadioGroup.Label>
                        {size.inStock ? (
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-md"
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}
        {error && (
          <p className="text-red-600 mt-3 font-bold text-xl capitalize">
            {error}
          </p>
        )}
        {userData.role === "user" && productData.stock > 0 && (
          <Button
            onClick={handleClick}
            className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add to Cart
          </Button>
        )}
      </form>
    </>
  );
};

export default SizeAndColor;
