import React from "react";

import SavedAddress from "./SavedAddress";
import PaymentMethods from "./PaymentMethods";
import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../common/Button";
import { country } from "../../utils/constant";

const Form = () => {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                id="firstName"
                title="First Name"
                type="text"
                placeHolder="Enter first name..."
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                id="lastName"
                title="Last Name"
                type="text"
                placeHolder="Enter last name..."
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                id="email"
                title="Email Address"
                type="email"
                placeHolder="Enter email address..."
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                id="country"
                title="Country"
                type="text"
                placeHolder="Enter country..."
              />
            </div>

            <div className="sm:col-span-3">
              <Select
                id="country"
                title="Country"
                options={country}
                defaultValue="Select your country"
              />
            </div>

            <div className="col-span-full">
              <Input
                id="streetAddress"
                title="Street Address"
                type="text"
                placeHolder="Enter stree address..."
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <Input
                id="city"
                title="City"
                type="text"
                placeHolder="Enter city..."
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                id="region"
                title="State / Province"
                type="text"
                placeHolder="Enter state / province..."
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                id="postalCode"
                title="ZIP / Postal code"
                type="text"
                placeHolder="Enter ZIP / Postal code..."
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="reset"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <SavedAddress />
            <PaymentMethods />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
