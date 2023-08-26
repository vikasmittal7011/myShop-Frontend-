import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./NavBar";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import Footer from "../components/common/Footer";
import Addresses from "../components/userProfile/Addresses";
import AddressForm from "../components/userProfile/AddressForm";
import { clearMessage } from "../features/user/userSlice";
import { selectuser, updateUserAsync } from "../features/user/userSlice";

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
    country: "",
  });

  const { userData, message } = useSelector(selectuser);

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

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

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
        <p className="text-red-600 text-center my-3 font-bold text-2xl capitalize">
          {message?.message}
        </p>
        {userData && (
          <div className="mx-10 my-8">
            <h2 className="font-bold text-xl mb-3 text-green-500">
              Name: {userData?.name}
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
        )}
        <Footer />
      </NavBar>
    </>
  );
};

export default UserProfile;
