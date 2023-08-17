import { useDispatch, useSelector } from "react-redux";

import Header from "../components/common/Header";
import Addresses from "../components/userProfile/Addresses";
import { selectuser, updateUserAsync } from "../features/user/userSlice";
import AddressForm from "../components/userProfile/AddressForm";
import Button from "../components/common/Button";
import { useState } from "react";
import NavBar from "./NavBar";

const UserProfile = () => {
  const dispatch = useDispatch();

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

  const { userData } = useSelector(selectuser);

  const handleModel = () => {
    setIsOpen(!isOpen);
  };

  const formAction = (address) => {
    const newUser = {
      ...userData,
      addresses: [...userData.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    handleModel();
    setAddressData({
      name: "",
      email: "",
      tel: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "Select your country",
    });
  };

  return (
    <>
      <NavBar>
        <AddressForm
          isOpen={isOpen}
          handleModel={handleModel}
          action="Add"
          title="Create New Address Here...."
          initUserInfo={addressData}
          formAction={formAction}
        />
        <Header heading="My Profile" />
        <div className="mx-10 my-8">
          <h2 className="font-bold text-xl mb-3 text-green-500">
            Name: {userData?.addresses?.[0]?.name}
          </h2>
          <h2 className="font-bold text-xl mb-1 text-blue-400">
            Email: {userData?.email}
          </h2>
          <Button
            onClick={handleModel}
            className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold mt-6 py-2 px-4 mr-2 rounded"
          >
            Add New Address
          </Button>
          <Addresses user={userData || null} />
        </div>
      </NavBar>
    </>
  );
};

export default UserProfile;
