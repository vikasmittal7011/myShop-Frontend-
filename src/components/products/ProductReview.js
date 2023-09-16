import dayjs from "dayjs";

import usericon from "../../assets/usericon.png";
import Image from "../common/Image";

const ProductReview = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((r, i) => (
        <div key={i} className="border p-4 rounded bg-gray-100">
          <div className="flex items-center space-x-2">
            <Image src={usericon} alt="icon" className="w-8 h-8 rounded-full" />
            <p className="font-bold">{r.user.name}</p>
          </div>
          <p className="text-gray-600 text-sm my-2">
            Posted On: {dayjs(r.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
