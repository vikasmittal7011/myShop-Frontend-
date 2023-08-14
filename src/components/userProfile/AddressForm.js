import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../form/Input";
import Select from "../form/Select";
import { country } from "../../utils/constant";

const AddressForm = ({
  title,
  action,
  isOpen,
  handleModel,
  initUserInfo,
  formAction,
}) => {
  const validatePatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
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

  const [userInfo, setUserInfo] = useState(null);

  const [userMistakes, setUserMistakes] = useState(initUserMistake);

  const handleUserInfo = (id, value) => {
    setUserInfo({ ...userInfo, [id]: value });
    setUserMistakes(initUserMistake);
  };

  useEffect(() => {
    setUserInfo(initUserInfo);
    setUserMistakes(initUserMistake);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initUserInfo, isOpen]);

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
      formAction(userInfo);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isOpen && (
        <div className="fixed py-5 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-gray-200 rounded-lg p-6 w-3/4 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold text-purple-600">{title}</h5>
            </div>
            {userInfo && (
              <div className="modal-dialog modal-dialog-scrollable">
                <form onSubmit={handleSubmit}>
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
                  <div className="flex justify-end my-5">
                    <Button
                      onClick={() => {
                        handleModel();
                        setUserInfo(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 mr-2 rounded"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      {action}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
