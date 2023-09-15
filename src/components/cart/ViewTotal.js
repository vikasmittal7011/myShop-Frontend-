import { Link } from "react-router-dom";

const ViewTotal = ({
  afterCheckout,
  checkoutTitle,
  items,
  onClick,
  message,
}) => {
  const totalPrice = items.reduce(
    (amount, item) => item?.item?.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900 mt-2 ">
        <p>Subtotal</p>
        <p>$ {totalPrice}</p>
      </div>
      <div className="flex justify-between text-base font-medium text-gray-900 mt-2 ">
        <p>Total Items</p>
        <p>{totalItems} items</p>
      </div>
      <p className="text-sm text-gray-500 mt-2 ">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6">
        {afterCheckout && (
          <Link
            to={afterCheckout}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {checkoutTitle}
          </Link>
        )}
        {onClick && (
          <>
            <div
              onClick={() => {
                onClick(totalItems, totalPrice);
              }}
              className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {checkoutTitle}
            </div>
            <p className="text-red-500 font-bold text-xl">{message}</p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or
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
  );
};

export default ViewTotal;
