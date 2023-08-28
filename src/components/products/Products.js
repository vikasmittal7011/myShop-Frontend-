import { useSelector } from "react-redux";

import Loader from "../common/Loader";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import AdminProductList from "./AdminProductList";
import { selectuser } from "../../features/user/userSlice";

const Products = ({
  handlePage,
  page,
  setPage,
  products,
  status,
  totalItems,
}) => {
  const { userData } = useSelector(selectuser);

  if (status !== "idle") {
    return <Loader />;
  }

  return (
    <>
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
    </>
  );
};

export default Products;
