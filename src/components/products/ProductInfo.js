import Review from "./Review";
import SizeAndColor from "./SizeAndColor";
import Highlights from "./Highlights";
import Button from "../common/Button";

const ProductInfo = ({
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  product,
  handleModel,
}) => {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {product?.title}
        </h1>
      </div>

      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <div>
          <p className="text-3xl font-medium text-gray-900">
            $ {product?.discountPrice}
          </p>
          <p className="text-xl font-medium text-red-400 line-through">
            $ {product?.price}
          </p>
        </div>
        {product?.averageRating !== 0 && <Review reviews={product} />}

        <SizeAndColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          productData={product}
        />
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <div>
          <div className="space-y-6">
            <p className="text-base text-gray-900">{product.description}</p>
          </div>
        </div>

        <div className="mt-10">
          {product.highlights && (
            <Highlights highlights={product?.highlights} />
          )}
        </div>

        {product.details && (
          <div className="mt-10">
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product?.details}</p>
            </div>
          </div>
        )}
        <Button
          onClick={handleModel}
          className="mt-5 flex items-center justify-center rounded-md border border-transparent bg-cyan-400 px-8 py-3 text-base font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Post Review
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
