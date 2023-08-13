import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectauth } from "../features/auth/authSlice";
import { fetchUserOrdersAsync, selectuser } from "../features/user/userSlice";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import Headings from "../components/userOrders/Headings";
import Items from "../components/userOrders/Items";
import TotalAndItems from "../components/userOrders/TotalAndItems";
import Address from "../components/userOrders/Address";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectauth);
  const { userOrders, status } = useSelector(selectuser);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(loggedInUser?.id));
  }, [loggedInUser, dispatch]);

  if (status !== "idle" || !userOrders) {
    return <Loader />;
  }

  return (
    <>
      <Header heading="Your Orders" />
      <ul className="divide-y divide-gray-400 mx-10 pb-6">
        {userOrders.map((order, i) => (
          <div key={i} className="my-10">
            <Headings order={order} />
            <Items items={order.items} title={order.title} />
            <TotalAndItems order={order} />
            <Address address={order.address} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default UserOrders;
