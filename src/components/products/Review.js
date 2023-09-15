import { StarIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/constant";

const Review = ({ reviews }) => {
  return (
    <>
      <div className="mt-6">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.averageRating > rating
                    ? "text-gray-900"
                    : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-blue-500 underline cursor-pointer ml-2">
            {reviews.totalRating.length} Reviews
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
