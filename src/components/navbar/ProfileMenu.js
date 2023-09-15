import { forwardRef } from "react";
import { Menu } from "@headlessui/react";

import Links from "./Links";
import {
  adminProfileLinks,
  classNames,
  userProfileLinks,
} from "../../utils/constant";
import TransitionEffet from "../common/TransitionEffet";
import { useSelector } from "react-redux";
import { selectuser } from "../../features/user/userSlice";

// Wrap the Links component with forwardRef
const ForwardedLinks = forwardRef((props, ref) => {
  return <Links {...props} forwardedRef={ref} />;
});

const ProfileMenu = () => {
  const { userData } = useSelector(selectuser);

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </Menu.Button>
      </div>
      <TransitionEffet>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userData.role === "user"
            ? userProfileLinks.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <ForwardedLinks
                      to={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      name={item.name}
                    />
                  )}
                </Menu.Item>
              ))
            : adminProfileLinks.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <ForwardedLinks
                      to={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      name={item.name}
                    />
                  )}
                </Menu.Item>
              ))}
        </Menu.Items>
      </TransitionEffet>
    </Menu>
  );
};

export default ProfileMenu;
