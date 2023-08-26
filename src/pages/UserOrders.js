import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./NavBar";
import Headings from "../components/userOrders/Headings";
import Items from "../components/userOrders/Items";
import Address from "../components/userOrders/Address";
import TotalAndItems from "../components/userOrders/TotalAndItems";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  clearMessage,
  fetchUserOrdersAsync,
  selectuser,
} from "../features/user/userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { userOrders, status, userData, message } = useSelector(selectuser);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(userData?.id));
  }, [userData, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  if (status !== "idle" || !userOrders) {
    return <Loader />;
  }

  return (
    <>
      <NavBar>
        <Header heading="Your Orders" />
        <p className="text-red-600 text-center my-3 font-bold text-2xl capitalize">
          {message?.message}
        </p>
        <ul className="divide-y divide-gray-400 lg:mx-10 md:mx-10 sm:mx-10 l:mx-10 s:mx-10 xs:mx-[20px]  pb-6">
          {userOrders.map((order, i) => (
            <div key={i} className="my-10">
              <Headings order={order} />
              <Items items={order.items} title={order.title} />
              <TotalAndItems order={order} />
              <Address address={order.address} />
            </div>
          ))}
        </ul>
        <Footer />
      </NavBar>
    </>
  );
};

export default UserOrders;
