import Image from "../common/Image";

const Images = ({ images }) => {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        {images[0] && (
          <Image src={process.env.REACT_APP_API + images[0]} alt={images[0]} />
        )}
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          {images[1] && (
            <Image
              src={process.env.REACT_APP_API + images[1]}
              alt={images[1]}
            />
          )}
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          {images[2] && (
            <Image
              src={process.env.REACT_APP_API + images[2]}
              alt={images[2]}
            />
          )}
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden rounded-lg s:mx-3 l:mx-3 xs:mx-3">
        {images[3] && (
          <Image src={process.env.REACT_APP_API + images[3]} alt={images[3]} />
        )}
      </div>
    </div>
  );
};

export default Images;
