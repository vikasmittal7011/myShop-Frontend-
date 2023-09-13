import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearMessage,
  fetchProductByIdAsync,
  fetchRelatedProductByIdAsync,
  selectProducts,
} from "../features/product/productSlice";
import NavBar from "./NavBar";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductList from "../components/products/ProductList";
import Images from "../components/products/Images";
import ProductInfo from "../components/products/ProductInfo";
import AdminProductList from "../components/products/AdminProductList";
import { selectCart } from "../features/cart/cartSlice";
import { selectuser } from "../features/user/userSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, message, relatedProduct } =
    useSelector(selectProducts);
  const { userData } = useSelector(selectuser);
  const { status: cartState } = useSelector(selectCart);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct?.sizes[0] || ""
  );

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
    dispatch(fetchRelatedProductByIdAsync(id));
    setSelectedColor(selectedProduct?.colors[0] || "");
    setSelectedSize(selectedProduct?.sizes[0] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  if (status !== "idle" || selectedProduct === null || cartState !== "idle") {
    return <Loader />;
  }

  return (
    <>
      <NavBar>
        <Header heading="Product Overview" />
        <p className="text-red-600 my-3 font-bold text-2xl capitalize">
          {message?.message}
        </p>
        <div className="pt-6">
          <Images images={selectedProduct?.images} />

          <ProductInfo
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            product={selectedProduct}
          />
        </div>
        {relatedProduct.length > 0 && (
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-3 mt-3  ">
            <h1 className="text-2xl font-bold tracking-tight my-3">
              Similar Products
            </h1>
            {userData.role === "user" ? (
              <ProductList products={relatedProduct} />
            ) : (
              <AdminProductList products={relatedProduct} />
            )}
          </div>
        )}
        <Footer />
      </NavBar>
    </>
  );
};

export default ProductDetails;
