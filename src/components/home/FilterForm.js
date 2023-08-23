import React from "react";
import { Disclosure } from "@headlessui/react";
import FilterTitle from "./FilterTitle";
import { useSelector } from "react-redux";
import { selectBrand } from "../../features/brand/brandSlice";
import { selectCategory } from "../../features/category/categorySlice";

const FilterForm = ({ handleFilters }) => {
  const { brand } = useSelector(selectBrand);
  const { category } = useSelector(selectCategory);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: category,
    },
    {
      id: "brand",
      name: "Brand",
      options: brand,
    },
  ];

  return (
    <form className="hidden lg:block">
      {filters?.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <FilterTitle
                h3Class="-my-3"
                disclosureClass="py-3 text-sm"
                open={open}
                name={section.name}
              />
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.id}
                        type="checkbox"
                        onChange={(e) => {
                          handleFilters(section.id, e);
                        }}
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.name}
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

export default FilterForm;
