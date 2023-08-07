import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MobileFilterForm from "./MobileFilterForm";
import TransitionEffet from "../common/TransitionEffet";

const MobileFilter = ({ mobileFiltersOpen, setMobileFiltersOpen }) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <TransitionEffet>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionEffet>

        <div className="fixed inset-0 z-40 flex">
          <TransitionEffet>
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <MobileFilterForm />
            </Dialog.Panel>
          </TransitionEffet>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileFilter;
