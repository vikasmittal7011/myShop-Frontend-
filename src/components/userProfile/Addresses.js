import Button from "../common/Button";
import { Classes } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../features/user/userSlice";
import { useState } from "react";
import AddressForm from "./AddressForm";

const Addresses = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    name: "",
    email: "",
    tel: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "Select your country",
  });

  const dispatch = useDispatch();

  const handleRemove = (index) => {
    const newUserData = { ...user, addresses: [...user.addresses] };
    newUserData.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUserData));
  };

  const handleUpdate = (index) => {
    const selectedAddress = { ...user.addresses[index], index: index };
    setAddressData(selectedAddress);
  };

  const handleModel = (i) => {
    setIsOpen(!isOpen);
    handleUpdate(i);
  };

  const formAction = (address) => {
    const index = address.index;
    delete address.index;
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, address);
    dispatch(updateUserAsync(newUser));
    handleModel();
  };

  return (
    <>
      <AddressForm
        isOpen={isOpen}
        handleModel={handleModel}
        action="Edit"
        title="Update Address Here...."
        initUserInfo={addressData}
        formAction={formAction}
      />
      <fieldset className="mt-10 pb-8">
        <legend className="font-semibold leading-6 text-purple-900">
          Your Addresses
        </legend>
        <div className="mt-2 space-y-6">
          <ul className="divide-y divide-gray-100">
            {user &&
              user?.addresses.map((address, i) => (
                <div key={i}>
                  <li
                    key={i}
                    className={`flex justify-between ${Classes.flexDirectionClass} gap-x-6 py-5 border bottom-1 rounded-md border-gray-400 px-3 my-5`}
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address?.name}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {address?.street},
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {address?.city}, {address?.state},
                        </p>
                        <p className="text-sm leading-6 text-gray-900"></p>
                        <p className="text-sm leading-6 text-gray-900">
                          {address?.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address?.tel}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address?.email}
                      </p>
                    </div>
                  </li>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        handleRemove(i);
                      }}
                      className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-red-700"
                      type="button"
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => {
                        handleModel(i);
                      }}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      type="button"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </fieldset>
    </>
  );
};

export default Addresses;
