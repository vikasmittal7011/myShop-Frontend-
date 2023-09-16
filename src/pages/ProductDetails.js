import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import loader from "../assets/loader.gif";
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
import ProductReview from "../components/products/ProductReview";
import PostReviewForm from "../components/products/PostReviewForm";
import { selectCart } from "../features/cart/cartSlice";
import { selectuser } from "../features/user/userSlice";
import {
  fetchReviewsAsync,
  postReviewAsync,
  selectReview,
} from "../features/review/reviewSlice";
import { ITEM_PAGE_PER } from "../utils/constant";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userData } = useSelector(selectuser);
  const { status: cartState } = useSelector(selectCart);
  const { selectedProduct, status, message, relatedProduct } =
    useSelector(selectProducts);
  const { reviews, totalReviews } = useSelector(selectReview);

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct?.sizes[0] || ""
  );

  const handleModel = () => {
    setIsOpen(!isOpen);
  };

  const formAction = (review) => {
    const newReview = { ...review, product: selectedProduct.id };
    dispatch(postReviewAsync(newReview));
    const pagination = { _page: page, _limit: ITEM_PAGE_PER };
    dispatch(fetchReviewsAsync({ id, pagination }));
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
    dispatch(fetchRelatedProductByIdAsync(id));
    setSelectedColor(selectedProduct?.colors[0] || "");
    setSelectedSize(selectedProduct?.sizes[0] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reviews]);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PAGE_PER };
    dispatch(fetchReviewsAsync({ id, pagination }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

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
      <PostReviewForm
        isOpen={isOpen}
        handleModal={handleModel}
        action="Post Review"
        title="Post new review for product here...."
        formAction={formAction}
      />
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
            handleModel={handleModel}
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
        {reviews.length > 0 && (
          <div
            className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-3 mt-3"
            id="reviews"
          >
            <h1 className="text-2xl font-bold tracking-tight my-3">
              Product Reviews
            </h1>
            <InfiniteScroll
              dataLength={totalReviews}
              next={() => {
                setPage(page + 1);
              }}
              hasMore={totalReviews > reviews.length}
              loader={
                <div className={`flex justify-center my-2`}>
                  <img src={loader} alt="Loading" width={100} height={100} />
                </div>
              }
            >
              <ProductReview reviews={reviews} />
            </InfiniteScroll>
          </div>
        )}
        <Footer />
      </NavBar>
    </>
  );
};

export default ProductDetails;
