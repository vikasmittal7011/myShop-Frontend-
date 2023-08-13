import React, { useState } from "react";

import SavedAddress from "./SavedAddress";
import PaymentMethods from "./PaymentMethods";
import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../common/Button";
import { country } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserAsync } from "../../features/auth/authSlice";

const Form = ({ handlePaymentInfo }) => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector(selectUser);

  const validatePatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
  };

  const initUserInfo = {
    name: "",
    email: "",
    tel: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "Select your country",
  };

  const initUserMistake = {
    name: "",
    email: "",
    tel: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  };

  const [userInfo, setUserInfo] = useState(initUserInfo);

  const [userMistakes, setUserMistakes] = useState(initUserMistake);

  const handleUserInfo = (id, value) => {
    setUserInfo({ ...userInfo, [id]: value });
    setUserMistakes(initUserMistake);
  };

  const validate = (user) => {
    if (user.name === "") {
      setUserMistakes({ ...userMistakes, name: "Enter name correctly..." });
      return false;
    } else if (!validatePatterns.email.test(user.email)) {
      setUserMistakes({ ...userMistakes, email: "Enter email correctly..." });
      return false;
    } else if (user.phone === "") {
      setUserMistakes({
        ...userMistakes,
        tel: "Phone number must be 10 digits...",
      });
      return false;
    } else if (user.country === "Select your country") {
      setUserMistakes({
        ...userMistakes,
        country: "Select country...",
      });
      return false;
    } else if (user.street === "") {
      setUserMistakes({
        ...userMistakes,
        street: "Enter street address correctly...",
      });
      return false;
    } else if (user.city === "") {
      setUserMistakes({
        ...userMistakes,
        city: "Enter city name...",
      });
      return false;
    } else if (user.state === "") {
      setUserMistakes({
        ...userMistakes,
        state: "Enter state name...",
      });
      return false;
    } else if (user.pinCode === "") {
      setUserMistakes({
        ...userMistakes,
        pinCode: "Enter pincode...",
      });
      return false;
    } else {
      setUserMistakes(initUserMistake);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate(userInfo);
    if (valid) {
      dispatch(
        updateUserAsync({
          ...loggedInUser,
          addresses: [...loggedInUser.addresses, userInfo],
        })
      );
      setUserInfo(initUserInfo);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <Input
                  id="name"
                  title="full Name"
                  type="text"
                  placeHolder="Enter full name..."
                  value={userInfo.name}
                  errorMessage={userMistakes.name}
                  onChange={handleUserInfo}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="email"
                  title="Email Address"
                  type="email"
                  placeHolder="Enter email address..."
                  value={userInfo.email}
                  onChange={handleUserInfo}
                  errorMessage={userMistakes.email}
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  id="tel"
                  title="Phone Number"
                  type="text"
                  placeHolder="Enter phone number..."
                  errorMessage={userMistakes.tel}
                  onChange={handleUserInfo}
                  value={userInfo.tel}
                />
              </div>

              <div className="sm:col-span-3">
                <Select
                  id="country"
                  title="Country"
                  options={country}
                  defaultValue={userInfo.country}
                  errorMessage={userMistakes.country}
                  onChange={handleUserInfo}
                />
              </div>

              <div className="col-span-full">
                <Input
                  id="street"
                  title="Street Address"
                  type="text"
                  placeHolder="Enter stree address..."
                  onChange={handleUserInfo}
                  value={userInfo.street}
                  errorMessage={userMistakes.street}
                />
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <Input
                  id="city"
                  title="City"
                  type="text"
                  placeHolder="Enter city..."
                  onChange={handleUserInfo}
                  value={userInfo.city}
                  errorMessage={userMistakes.city}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  id="state"
                  title="State / Province"
                  type="text"
                  placeHolder="Enter state / province..."
                  onChange={handleUserInfo}
                  value={userInfo.state}
                  errorMessage={userMistakes.state}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  id="pinCode"
                  title="ZIP / Postal code"
                  type="text"
                  placeHolder="Enter ZIP / Postal code..."
                  onChange={handleUserInfo}
                  value={userInfo.pinCode}
                  errorMessage={userMistakes.pinCode}
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
              <SavedAddress
                handlePaymentInfo={handlePaymentInfo}
                addresses={loggedInUser.addresses}
              />
              <PaymentMethods handlePaymentInfo={handlePaymentInfo} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
