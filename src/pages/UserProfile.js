import { useSelector } from "react-redux";

import Header from "../components/common/Header";
import Addresses from "../components/userProfile/Addresses";
import { selectuser } from "../features/user/userSlice";

const UserProfile = () => {
  const { userData } = useSelector(selectuser);

  return (
    <>
      <Header heading="My Profile" />
      <div className="mx-10 my-8">
        <h2 className="font-bold text-xl mb-3 text-green-500">
          Name: {userData?.addresses?.[0]?.name}
        </h2>
        <h2 className="font-bold text-xl mb-1 text-blue-400">
          Email: {userData?.email}
        </h2>
        <Addresses user={userData || null} />
      </div>
    </>
  );
};

export default UserProfile;
