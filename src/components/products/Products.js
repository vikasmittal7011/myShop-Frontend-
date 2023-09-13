import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../common/Loader";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import AdminProductList from "./AdminProductList";
import { selectuser } from "../../features/user/userSlice";
import {
  fetchProductByFiltersAsync,
  selectProducts,
} from "../../features/product/productSlice";
import { ITEM_PAGE_PER } from "../../utils/constant";

const Products = ({ filters, sort, search }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { userData } = useSelector(selectuser);
  const {
    products: { products },
    status,
    totalItems,
  } = useSelector(selectProducts);

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (userData) {
      const pagination = { _page: page, _limit: ITEM_PAGE_PER };
      dispatch(
        fetchProductByFiltersAsync({
          filters,
          sort,
          pagination,
          admin: userData.role === "admin" ? true : false,
          search,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filters, page, userData, search]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  if (status !== "idle" || !products) {
    return <Loader />;
  }

  return (
    <>
      {products?.length > 0 ? (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-3 mt-3">
          {userData.role === "user" ? (
            <ProductList products={products} />
          ) : (
            <AdminProductList products={products} />
          )}
          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalProduct={totalItems}
          />
        </div>
      ) : (
        <h1 className="text-2xl font-bold tracking-tight my-5 text-center">
          No product found{" "}
          {search && (
            <>
              with <span className="text-red-500">'{search}'</span> name
            </>
          )}
        </h1>
      )}
    </>
  );
};

export default Products;
