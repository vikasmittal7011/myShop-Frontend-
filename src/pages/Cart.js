import { useSelector } from "react-redux";

import Header from "../components/common/Header";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";
import { selectCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../components/common/Footer";

const Cart = () => {
  const {
    items: { cart },
  } = useSelector(selectCart);

  return (
    <>
      <NavBar>
        <Header heading="Cart" />
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          {cart.length > 0 ? (
            <>
              <ViewProduct items={cart} />
              <ViewTotal
                afterCheckout="/checkout"
                checkoutTitle="Checkout"
                items={cart}
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
