import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import Images from "../components/products/Images";
import ProductInfo from "../components/products/ProductInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  fetchProductByIdAsync,
  selectProducts,
} from "../features/product/productSlice";
import Loader from "../components/common/Loader";
import NavBar from "./NavBar";
import Footer from "../components/common/Footer";

const colorAndSizes = {
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(colorAndSizes.colors[0]);
  const [selectedSize, setSelectedSize] = useState(colorAndSizes.sizes[2]);
  const { selectedProduct, status, message } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  if (status !== "idle" || selectedProduct === null) {
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
            colorAndSizes={colorAndSizes}
          />
        </div>
        <Footer />
      </NavBar>
    </>
  );
};

export default ProductDetails;
