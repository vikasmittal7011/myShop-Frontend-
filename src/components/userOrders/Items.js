import { Classes } from "../../utils/constant";
import Image from "../common/Image";

const Items = ({ items, title }) => {
  return (
    <>
      {items?.map((detail, i) => {
        const { item } = detail;
        return (
          <li
            key={i}
            className={`flex py-6 ${Classes.flexDirectionClass} l:gap-y-5 s:gap-y-5 xs:gap-y-5`}
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={process.env.REACT_APP_API + item?.thumbnail}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div
                  className={`flex justify-between text-base font-medium text-gray-900 ${Classes.flexDirectionClass} gap-y-2`}
                >
                  <h3>{item?.title}</h3>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      $ {item?.discountPrice}
                    </p>
                    <p className="text-sm font-medium text-red-400 line-through">
                      $ {item?.price}
                    </p>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Color {item?.color || "Blue"}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Quantity {detail.quantity} </p>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Items;
