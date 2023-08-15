import { useSelector } from "react-redux";

import Loader from "../common/Loader";
import Pagination from "./Pagination";
import { selectauth } from "../../features/auth/authSlice";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

const Products = ({
  handlePage,
  page,
  setPage,
  products,
  status,
  totalItems,
}) => {
  const { loggedInUser } = useSelector(selectauth);

  if (status !== "idle") {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-12 lg:max-w-7xl lg:px-8">
        {loggedInUser?.role === "admin" && (
          <Link
            to="/create-product"
            className="mb-10 flex items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-green-700"
            type="button"
          >
            Add New Product
          </Link>
        )}
        <ProductList products={products} loggedInUser={loggedInUser} />
        <Pagination
          handlePage={handlePage}
          page={page}
          setPage={setPage}
          totalProduct={totalItems}
        />
      </div>
    </>
  );
};

export default Products;
