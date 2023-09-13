import Review from "./Review";
import SizeAndColor from "./SizeAndColor";
import Highlights from "./Highlights";

const ProductInfo = ({
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  product,
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

        {product?.rating !== 0 && <Review reviews={product?.rating} />}

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
      </div>
    </div>
  );
};

export default ProductInfo;
