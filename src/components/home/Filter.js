import React from "react";
import { useState } from "react";
import { Menu } from "@headlessui/react";

import { Classe } from "../../utils/constant";
import MobileFilter from "./MobileFilter";
import OpenCloseBTN from "./OpenCloseBTN";
import SortOptions from "./SortOptions";
import FilterForm from "./FilterForm";
import Buttons from "./Buttons";
import Products from "../products/Products";

export const Filter = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div>
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
          <h1
            className={`${Classe.h1_size} font-bold tracking-tight text-gray-900`}
          >
            Filters Products
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <OpenCloseBTN />
              <SortOptions />
            </Menu>

            <Buttons setMobileFiltersOpen={setMobileFiltersOpen} />
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <FilterForm />

            <div className="lg:col-span-3"><Products /></div>
          </div>
        </section>
      </main>
    </div>
  );
};
