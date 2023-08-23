import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import Select from "../components/form/Select";
import ImageInput from "../components/form/ImageInput";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectProducts,
  updateProductAsync,
} from "../features/product/productSlice";
import NavBar from "./NavBar";

const ProductCreateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { brand, category, selectedProduct } = useSelector(selectProducts);

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
    brand: "64e06555269d90da84e9c36e",
    category: "64e065c4c1f15f3f3dc5aadb",
    // brand: "Select Brand",
    // category: "Select Category",
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
      const formData = new FormData();
      formData.append("title", productInfo.title);
      formData.append("description", productInfo.description);
      formData.append("price", +productInfo.price);
      formData.append("discountPercentage", +productInfo.discountPercentage);
      formData.append("stock", +productInfo.stock);
      formData.append("brand", productInfo.brand);
      formData.append("category", productInfo.category);
      formData.append("thumbnail", productInfo.thumbnail);
      formData.append("image1", productInfo.image1);
      formData.append("image2", productInfo.image2);
      formData.append("image3", productInfo.image3);
      formData.append("image4", productInfo.image4);
      console.log(productInfo);

      if (id) {
        productInfo.id = id;
        productInfo.rating = selectedProduct.rating || 0;
        dispatch(updateProductAsync(productInfo));
        navigate(`/product-details/${productInfo.id}`);
      } else {
        dispatch(createProductAsync(formData));
        navigate(`/`);
      }

      setProductInfo({
        ...productDetailsOne,
        ...productDetailsTwo,
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct && id) {
      setProductInfo({
        ...selectedProduct,
        image1: selectedProduct.images?.[1],
        image2: selectedProduct.images?.[2],
        image3: selectedProduct.images?.[3],
        image4: selectedProduct.images?.[4],
      });
    }
  }, [selectedProduct, id]);

  return (
    <>
      <NavBar>
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
                  <ImageInput
                    id="thumbnail"
                    title="Thumbnail"
                    onChange={handleProductInfo}
                    value={productInfo.thumbnail}
                    errorMessage={productMistakes.thumbnail}
                  />
                </div>

                <div className="sm:col-span-3">
                  <ImageInput
                    id="image1"
                    title="Image 1"
                    type="text"
                    onChange={handleProductInfo}
                    value={productInfo.image1}
                    errorMessage={productMistakes.image1}
                  />
                </div>

                <div className="sm:col-span-3">
                  <ImageInput
                    id="image2"
                    title="Image 2"
                    type="text"
                    onChange={handleProductInfo}
                    value={productInfo.image2}
                    errorMessage={productMistakes.image2}
                  />
                </div>

                <div className="sm:col-span-3">
                  <ImageInput
                    id="image3"
                    title="Image 3"
                    type="text"
                    onChange={handleProductInfo}
                    value={productInfo.image3}
                    errorMessage={productMistakes.image3}
                  />
                </div>

                <div className="sm:col-span-3">
                  <ImageInput
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
                  {id ? "Save Changes" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </NavBar>
    </>
  );
};

export default ProductCreateForm;
