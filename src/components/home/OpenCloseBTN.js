import { Menu } from "@headlessui/react";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const OpenCloseBTN = () => {
  return (
    <div>
      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Sort
        <ChevronDownIcon
          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </Menu.Button>
    </div>
  );
};

export default OpenCloseBTN;
