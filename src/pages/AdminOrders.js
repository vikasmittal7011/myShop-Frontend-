import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectorder } from "../features/order/orderSlice";

import { ITEM_PAGE_PER } from "../utils/constant";
import Headers from "../components/adminOrders/Headers";
import Body from "../components/adminOrders/Body";
import Header from "../components/common/Header";
import Pagination from "../components/products/Pagination";

const AdminOrders = () => {
  const { orders, totalOrders } = useSelector(selectorder);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ _sort: "id", _order: "asc" });

  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleShow = (index) => {};

  const handleEdit = (index) => {
    setEditableOrderId(index);
  };

  const handleSort = (value) => {
    const sort = { _sort: value.sort, _order: value.order };
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PAGE_PER };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <Header heading="Manage Orders" />
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center font-sans overflow-x">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6 mx-5">
              <table className="min-w-max w-full table-auto">
                <Headers handleSort={handleSort} sort={sort} />
                <Body
                  orders={orders}
                  handleEdit={handleEdit}
                  handleShow={handleShow}
                  editableOrderId={editableOrderId}
                />
              </table>
            </div>
          </div>
        </div>
        <Pagination
          handlePage={handlePage}
          page={page}
          totalProduct={totalOrders}
        />
      </div>
    </>
  );
};

export default AdminOrders;
