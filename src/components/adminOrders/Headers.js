import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const Headers = ({ handleSort, sort }) => {
  const showArrows = (id) => {
    return (
      sort._sort === id &&
      (sort?._order === "asc" ? (
        <ArrowUpIcon className="w-4 h-4 inline-block ml-1 mb-1" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 inline-block ml-1 mb-1" />
      ))
    );
  };

  const mangeSort = (id) => {
    handleSort({
      sort: id,
      order: sort._order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th
          className="py-3 px-6 text-left cursor-pointer"
          onClick={() => {
            mangeSort("createdAt");
          }}
        >
          Order# {showArrows("createdAt")}
        </th>
        <th className="py-3 px-6 text-left">Items</th>
        <th
          className="py-3 px-6 text-center cursor-pointer"
          onClick={() => {
            mangeSort("totalPrice");
          }}
        >
          Total amount {showArrows("totalPrice")}
        </th>
        <th className="py-3 px-6 text-center">Delivery Address</th>
        <th className="py-3 px-6 text-center">Delivery Status</th>
        <th className="py-3 px-6 text-center">Payment Status</th>
        <th className="py-3 px-6 text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default Headers;
