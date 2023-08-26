import { useEffect } from "react";
import { clearMessage, selectCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./NavBar";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, message } = useSelector(selectCart);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  return (
    <>
      <NavBar>
        <Header heading="Cart" />
        <p className="text-red-600 my-3 font-bold text-2xl capitalize">
          {message?.message}
        </p>
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <>
              <ViewProduct items={items} />
              <ViewTotal
                afterCheckout="/checkout"
                checkoutTitle="Checkout"
                items={items}
              />
            </>
          ) : (
            <div className="flex justify-center my-5 flex-col text-center">
              <h1 className="text-4xl font-bold">Your cart is empty!!!</h1>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p className="text-xl">
                  <Link
                    to="/"
                    className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </NavBar>
    </>
  );
};

export default Cart;
