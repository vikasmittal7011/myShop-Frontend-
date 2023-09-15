import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

const FilterTitle = ({ h3Class, disclosureClass, name, open }) => {
  return (
    <h3 className={`${h3Class} flow-root`}>
      <Disclosure.Button className={`flex w-full items-center justify-between bg-white ${disclosureClass} text-gray-400 hover:text-gray-500`}>
        <span className="font-medium text-gray-900">{name}</span>
        <span className="ml-6 flex items-center">
          {open ? (
            <MinusIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
      </Disclosure.Button>
    </h3>
  );
};

export default FilterTitle;
