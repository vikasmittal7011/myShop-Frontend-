import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React from "react";

const Buttons = ({setMobileFiltersOpen}) => {
  return (
    <>
      <button
        type="button"
        className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
      >
        <span className="sr-only">View grid</span>
        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
};

export default Buttons;
