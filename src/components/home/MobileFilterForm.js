import { Disclosure } from "@headlessui/react";
import React from "react";
import { filters } from "../../utils/constant";
import FilterTitle from "./FilterTitle";

const MobileFilterForm = () => {
  return (
    <form className="mt-4 border-t border-gray-200">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-t border-gray-200 px-4 py-6"
        >
          {({ open }) => (
            <>
              <FilterTitle
                h3Class="-mx-2 -my-3"
                disclosureClass="px-2 py-3"
                open={open}
                name={section.name}
              />
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default MobileFilterForm;
