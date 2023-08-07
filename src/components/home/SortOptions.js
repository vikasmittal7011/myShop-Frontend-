import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames, sortOptions } from "../../utils/constant";

const SortOptions = () => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {sortOptions.map((option) => (
            <Menu.Item key={option.name}>
              {({ active }) => (
                <a
                  href={option.href}
                  className={classNames(
                    option.current
                      ? "font-medium text-gray-900"
                      : "text-gray-500",
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {option.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default SortOptions;
