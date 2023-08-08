import React from "react";

import { temporyAddress } from "../../utils/constant";

const SavedAddress = () => {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Addresses
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Choose from Existing addresses.
      </p>
      <div className="mt-6 space-y-6">
        <ul className="divide-y divide-gray-100">
          {temporyAddress.map((address) => (
            <li
              key={address.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <input
                  onChange
                  id="address"
                  name="address"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 my-auto"
                  value
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.name}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.street},
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.city}, {address.state},
                  </p>
                  <p className="text-sm leading-6 text-gray-900"></p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {address.phone}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {address.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
};

export default SavedAddress;
