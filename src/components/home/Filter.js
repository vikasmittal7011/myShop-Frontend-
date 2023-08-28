import React, { useEffect } from "react";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductByFiltersAsync,
  selectProducts,
} from "../../features/product/productSlice";
import { fetchAllBrandAsync } from "../../features/brand/brandSlice";
import { fetchAllCategoryAsync } from "../../features/category/categorySlice";
import { Classes, ITEM_PAGE_PER } from "../../utils/constant";
import MobileFilter from "./MobileFilter";
import OpenCloseBTN from "./OpenCloseBTN";
import SortOptions from "./SortOptions";
import FilterForm from "./FilterForm";
import Buttons from "./Buttons";
import Products from "../products/Products";
import { selectuser } from "../../features/user/userSlice";

export const Filter = () => {
  const {
    products: { products },
    status,
    totalItems,
  } = useSelector(selectProducts);
  const { userData } = useSelector(selectuser);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ category: [], brand: [] });

  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const handleFilters = (id, e) => {
    const newFilter = { ...filters };
    if (e.target.checked) {
      newFilter[id].push(e.target.value);
    } else {
      const index = newFilter[id].findIndex((item) => item === e.target.value);
      newFilter[id].splice(index, 1);
    }
    setFilters(newFilter);
  };

  const handleSort = (value) => {
    const sort = { _sort: value.sort, _order: value.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PAGE_PER };
    dispatch(
      fetchProductByFiltersAsync({
        filters,
        sort,
        pagination,
        admin: userData.role === "admin" && true,
      })
    );
    dispatch(fetchAllBrandAsync());
    dispatch(fetchAllCategoryAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filters, page]);

  useEffect(() => {
    dispatch(fetchAllBrandAsync());
    dispatch(fetchAllCategoryAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return (
    <div>
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        handleFilters={handleFilters}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
          <h1
            className={`${Classes.h1_size} font-bold tracking-tight text-gray-900`}
          >
            Filters Products
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <OpenCloseBTN />
              <SortOptions handleSort={handleSort} />
            </Menu>

            <Buttons setMobileFiltersOpen={setMobileFiltersOpen} />
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-12 pt-6">
          <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-4">
            <FilterForm handleFilters={handleFilters} />

            <div className="lg:col-span-3">
              {products && (
                <Products
                  handlePage={handlePage}
                  page={page}
                  setPage={setPage}
                  products={products}
                  status={status}
                  totalItems={totalItems}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
