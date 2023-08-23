import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import Image from "../common/Image";
import { useDispatch } from "react-redux";
import {
  deleteItemAsync,
  updateItemAsync,
} from "../../features/cart/cartSlice";
import Modal from "../common/Modal";
import { useAlert } from "react-alert";

const CartItems = ({ items }) => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState(-1);
  const dispatch = useDispatch();

  const handleChange = (e, item) => {
    if (+e.target.value > 0) {
      const update = { ...item, quantity: +e.target.value };
      dispatch(updateItemAsync(update));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItemAsync(id));
    alert.success("Item was removed successfully");
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {items?.map((item) => (
          <li key={item?.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={process.env.REACT_APP_API + item?.item?.thumbnail}
                alt={item?.item?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={`/item-details/${item?.item?.id}`}>
                      {item?.item?.title}
                    </Link>
                  </h3>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${" "}
                      {Math.round(
                        item?.item?.price *
                          (1 - item?.item?.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium text-red-400 line-through">
                      $ {item?.item?.price}
                    </p>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {item?.item?.color || "Blue"}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">
                  Qty{" "}
                  <input
                    type="number"
                    className="w-20 rounded-md border-0 py-0.5 ml-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={item?.quantity}
                    onChange={(e) => {
                      handleChange(e, item);
                    }}
                  />
                </p>

                <Modal
                  isOpen={item.id === itemId && isOpen}
                  handleModal={handleModal}
                  message="Are sure to delete this item from cart"
                  title={`Remove ${item?.item.title}`}
                  action="Delete"
                  handleDelete={handleDelete}
                  itemId={itemId}
                />
                <div className="flex">
                  <Button
                    onClick={() => {
                      handleModal();
                      setItemId(item.id);
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
    </>
  );
};

export default CartItems;
