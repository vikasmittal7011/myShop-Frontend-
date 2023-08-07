import { Disclosure } from "@headlessui/react";
import React from "react";

import Links from "./Links";
import { classNames, navLinks } from "../../utils/constant";

const MobileLinks = ({ changeRef }) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navLinks.map((item) => (
          <Links
            key={item.name}
            as="Link"
            to={item.href}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
            name={item.name}
            onClick={() => {
              changeRef();
            }}
          />
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default MobileLinks;
