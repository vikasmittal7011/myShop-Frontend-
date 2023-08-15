import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import Select from "../components/form/Select";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import {
  createProductAsync,
  selectProducts,
} from "../features/product/productSlice";

const ProductCreateForm = () => {
  const dispatch = useDispatch();
  const { brand, category } = useSelector(selectProducts);

  const productDetailsOne = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    rating: 0,
    thumbnail: "",
    images: [],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  };

  const productDetailsTwo = {
    brand: "Select Brand",
    category: "Select Category",
  };

  const [productInfo, setProductInfo] = useState({
    ...productDetailsOne,
    ...productDetailsTwo,
  });

  const [productMistakes, setProductMistakes] = useState({
    ...productDetailsOne,
    brand: "",
    category: "",
  });

  const handleProductInfo = (id, value) => {
    setProductInfo({ ...productInfo, [id]: value });
    setProductMistakes({
      ...productDetailsOne,
      brand: "",
      category: "",
    });
  };

  const validation = (product) => {
    if (product.title === "") {
      setProductMistakes({ ...productMistakes, title: "Enter title corretly" });
      return false;
    } else if (product.description === "") {
      setProductMistakes({
        ...productMistakes,
        description: "Enter description corretly",
      });
      return false;
    } else if (product.price === "") {
      setProductMistakes({ ...productMistakes, price: "Enter price corretly" });
      return false;
    } else if (product.stock === "") {
      setProductMistakes({ ...productMistakes, stock: "Enter stock corretly" });
      return false;
    } else if (product.discountPercentage === "") {
      setProductMistakes({
        ...productMistakes,
        discountPercentage: "Enter discountPercentage corretly",
      });
      return false;
    } else if (product.brand === "" || product.brand === "Select Brand") {
      setProductMistakes({
        ...productMistakes,
        brand: "Enter brand corretly",
      });
      return false;
    } else if (
      product.category === "" ||
      product.category === "Select Category"
    ) {
      setProductMistakes({
        ...category,
        brand: "Enter category corretly",
      });
      return false;
    } else if (product.thumbnail === "") {
      setProductMistakes({
        ...productMistakes,
        thumbnail: "Enter thumbnail corretly",
      });
      return false;
    } else if (product.image1 === "") {
      setProductMistakes({
        ...productMistakes,
        image1: "Enter image1 corretly",
      });
      return false;
    } else if (product.image2 === "") {
      setProductMistakes({
        ...productMistakes,
        image2: "Enter image2 corretly",
      });
      return false;
    } else if (product.image3 === "") {
      setProductMistakes({
        ...productMistakes,
        image3: "Enter image3 corretly",
      });
      return false;
    } else if (product.image4 === "") {
      setProductMistakes({
        ...productMistakes,
        image4: "Enter image4 corretly",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validation(productInfo);
    if (valid) {
      const product = { ...productInfo };
      product.images = [
        product.image1,
        product.image2,
        product.image3,
        product.image4,
      ];
      delete product["image1"];
      delete product["image2"];
      delete product["image3"];
      delete product["image4"];

      dispatch(createProductAsync(product));
      setProductInfo({
        ...productDetailsOne,
        ...productDetailsTwo,
      });
    }
  };

  return (
    <>
      <Header heading="Add New Product" />
      <form onSubmit={handleSubmit} className="m-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <Input
                  id="title"
                  title="Title"
                  type="text"
                  placeHolder="Enter title..."
                  value={productInfo.title}
                  errorMessage={productMistakes.title}
                  onChange={handleProductInfo}
                />
              </div>

              <div className="sm:col-span-3">
                <Select
                  id="category"
                  title="Category"
                  options={category}
                  defaultValue={productInfo.category}
                  errorMessage={productMistakes.category}
                  onChange={handleProductInfo}
                />
              </div>

              <div className="sm:col-span-3">
                <Select
                  id="brand"
                  title="Brand"
                  options={brand}
                  defaultValue={productInfo.brand}
                  errorMessage={productMistakes.brand}
                  onChange={handleProductInfo}
                />
              </div>

              <div className="col-span-full">
                <TextArea
                  id="description"
                  title="Description"
                  type="text"
                  placeHolder="Enter description..."
                  onChange={handleProductInfo}
                  value={productInfo.description}
                  errorMessage={productMistakes.description}
                />
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <Input
                  id="price"
                  title="Price"
                  type="number"
                  placeHolder="Enter price..."
                  onChange={handleProductInfo}
                  value={productInfo.price}
                  errorMessage={productMistakes.price}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  id="discountPercentage"
                  title="Discount Percentage"
                  type="number"
                  placeHolder="Enter discount percentage..."
                  onChange={handleProductInfo}
                  value={productInfo.discountPercentage}
                  errorMessage={productMistakes.discountPercentage}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  id="stock"
                  title="Stock"
                  type="number"
                  placeHolder="Enter stock..."
                  onChange={handleProductInfo}
                  value={productInfo.stock}
                  errorMessage={productMistakes.stock}
                />
              </div>

              <div className="col-span-full">
                <Input
                  id="thumbnail"
                  title="Thumbnail"
                  type="text"
                  onChange={handleProductInfo}
                  value={productInfo.thumbnail}
                  errorMessage={productMistakes.thumbnail}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="image1"
                  title="Image 1"
                  type="text"
                  onChange={handleProductInfo}
                  value={productInfo.image1}
                  errorMessage={productMistakes.image1}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="image2"
                  title="Image 2"
                  type="text"
                  onChange={handleProductInfo}
                  value={productInfo.image2}
                  errorMessage={productMistakes.image2}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="image3"
                  title="Image 3"
                  type="text"
                  onChange={handleProductInfo}
                  value={productInfo.image3}
                  errorMessage={productMistakes.image3}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="image4"
                  title="Image 4"
                  type="text"
                  onChange={handleProductInfo}
                  value={productInfo.image4}
                  errorMessage={productMistakes.image4}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                onClick={() => {
                  setProductInfo({
                    ...productDetailsOne,
                    ...productDetailsTwo,
                  });
                }}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductCreateForm;
