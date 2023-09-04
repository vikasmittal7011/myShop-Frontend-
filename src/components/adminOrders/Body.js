import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Image from "../common/Image";
import { orderStatus } from "../../utils/constant";
import { updateOrderAsync } from "../../features/order/orderSlice";

dayjs.extend(relativeTime);

const Body = ({ orders, handleShow, handleEdit, editableOrderId }) => {
  const dispatch = useDispatch();
  const checkOddOrNot = (value) => {
    return value % 2 !== 0 && "bg-gray-50";
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order };
    updateOrder.status = e.target.value;
    if (e.target.value === "Delivered") {
      updateOrder.paymentStatus = "Receive";
    }
    dispatch(updateOrderAsync(updateOrder));
    handleEdit(-1);
  };

  const colorPicker = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600";
      case "Dispatch":
        return "bg-yellow-200 text-yellow-600";
      case "Delivered":
        return "bg-green-200 text-green-600";
      case "Cancel":
        return "bg-red-200 text-red-600";
      case "Receive":
        return "bg-green-200 text--600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <tbody className="text-gray-600 text-sm font-light">
      {orders &&
        orders?.map((order, i) => (
          <tr
            key={i}
            className={`border-b border-gray-200 hover:bg-gray-100 ${checkOddOrNot(
              i
            )} `}
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <span className="font-medium">
                  {dayjs(order.createdAt).fromNow()}
                </span>
              </div>
            </td>
            <td className="py-3 px-6 text-left">
              {order?.items?.map((detail, i) => {
                const { item } = detail;
                return (
                  <div key={i} className="flex items-center my-2">
                    <div className="mr-2">
                      <Image
                        className="w-16 h-16 rounded-full"
                        src={process.env.REACT_APP_API + item.thumbnail}
                        alt={item.title}
                      />
                    </div>
                    <span>
                      {item.title} - #{detail.quantity} - $
                      {Math.round(
                        item?.price * (1 - item?.discountPercentage / 100)
                      )}
                    </span>
                  </div>
                );
              })}
            </td>
            <td className="py-3 px-6 text-center">
              <div className="flex items-center justify-center">
                $ {order.totalPrice} By - {order.paymentMethod}
              </div>
            </td>
            <td className="py-3 px-6 text-start">
              <div className="flex items-center justify-center flex-col">
                {order.address.name} <br />
                {order.address.street},<br />
                {order.address.city}, <br />
                {order.address.state}, {order.address.pinCode},{" "}
                {order.address.country} <br />
              </div>
            </td>
            <td className="py-3 px-6 text-center">
              {editableOrderId === order.id ? (
                <select
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => handleUpdate(e, order)}
                >
                  <option value="pending">{order.status}</option>
                  {orderStatus?.map((o, i) => (
                    <option key={i} value={o.code}>
                      {o.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className={`${colorPicker(
                    order.status
                  )} py-1 px-3 rounded-full text-xs`}
                >
                  {order.status}
                </span>
              )}
            </td>
            <td className="py-3 px-6 text-center">
              <div className="flex items-center">
                <span
                  className={`${colorPicker(
                    order.paymentStatus
                  )} py-1 px-3 rounded-full text-xs`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </td>
            <td className="py-3 px-6 text-center">
              <div className="flex item-center justify-center">
                <div className="w-4 mx-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer">
                  <EyeIcon
                    className="w-6 h-6"
                    onClick={() => {
                      handleShow(order.id);
                    }}
                  />
                </div>
                <div className="w-4 mx-2 transform hover:text-green-500 hover:scale-110 cursor-pointer">
                  <PencilIcon
                    className="w-6 h-6"
                    onClick={() => {
                      handleEdit(order.id);
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default Body;
