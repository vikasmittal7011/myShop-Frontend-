import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ITEM_PAGE_PER } from "../utils/constant";
import NavBar from "./NavBar";
import Headers from "../components/adminOrders/Headers";
import Body from "../components/adminOrders/Body";
import Pagination from "../components/products/Pagination";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import {
  clearMessage,
  fetchAllOrdersAsync,
  selectorder,
} from "../features/order/orderSlice";

const AdminOrders = () => {
  const { orders, totalOrders, message } = useSelector(selectorder);
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

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  if (!orders) {
    return <Loader />;
  }

  return (
    <>
      <NavBar>
        <Header heading="Manage Orders" />
        <p className="text-red-600 my-3 font-bold text-2xl capitalize">
          {message?.message}
        </p>
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
        </div>
        <Pagination
          handlePage={handlePage}
          page={page}
          totalProduct={totalOrders}
        />
      </NavBar>
    </>
  );
};

export default AdminOrders;
