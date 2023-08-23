import { useSelector } from "react-redux";
import { selectauth } from "../../features/auth/authSlice";

import Loader from "../common/Loader";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import AdminProductList from "./AdminProductList";

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
        {loggedInUser.role === "user" ? (
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
    </>
  );
};

export default Products;
