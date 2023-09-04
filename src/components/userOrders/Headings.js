import dayjs from "dayjs";

const Headings = ({ order }) => {
  return (
    <>
      <h1 className="font-bold lg:text-2xl md:text-2xl sm:text-2xl l:text-2xl s:text-2xl xs:text-[1.3rem] mb-3">
        Order Id: #{order.id}
      </h1>
      <h2 className="font-bold text-xl mb-3 text-green-500">
        Order On: {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </h2>
      <h2 className="font-bold text-xl mb-3 text-green-500">
        Order Status: {order.status}
      </h2>
      <h2 className="font-bold text-xl mb-1 text-blue-400">
        Payment Mode: {order.paymentMethod}
      </h2>
    </>
  );
};

export default Headings;
