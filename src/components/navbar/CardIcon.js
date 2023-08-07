import React from "react";

import ProfileMenu from "./ProfileMenu";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const CardIcon = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 z-0"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <span className="inline-flex items-center rounded-md bg-blue-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 z-10">
        0
      </span>
      <ProfileMenu />
    </div>
  );
};

export default CardIcon;
