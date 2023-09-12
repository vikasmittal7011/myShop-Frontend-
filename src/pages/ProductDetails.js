import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Images from "../components/products/Images";
import ProductInfo from "../components/products/ProductInfo";
import {
  clearMessage,
  fetchProductByIdAsync,
  selectProducts,
} from "../features/product/productSlice";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import NavBar from "./NavBar";
import { selectCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, message } = useSelector(selectProducts);
  const { status: cartState } = useSelector(selectCart);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct?.sizes[0] || ""
  );

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
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
        <Footer />
      </NavBar>
    </>
  );
};

export default ProductDetails;
