const TotalAndItems = ({ order }) => {
  return (
    <>
      <div className="flex justify-between text-base font-medium text-gray-900 mt-2 ">
        <p>Subtotal</p>
        <p>$ {order.totalPrice}</p>
      </div>
      <div className="flex justify-between text-base font-medium text-gray-900 mt-2 ">
        <p>Total Items</p>
        <p>{order.totalItems} items</p>
      </div>
    </>
  );
};

export default TotalAndItems;
