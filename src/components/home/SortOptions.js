import { Menu } from "@headlessui/react";
import { classNames, sortOptions } from "../../utils/constant";
import TransitionEffet from "../common/TransitionEffet";

const SortOptions = ({ handleSort }) => {
  return (
    <TransitionEffet>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {sortOptions.map((option) => (
            <Menu.Item key={option.name}>
              {({ active }) => (
                <p
                  className={classNames(
                    option.current
                      ? "font-medium text-gray-900"
                      : "text-gray-500",
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  onClick={(e) => {
                    handleSort(option);
                  }}
                >
                  {option.name}
                </p>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </TransitionEffet>
  );
};

export default SortOptions;
