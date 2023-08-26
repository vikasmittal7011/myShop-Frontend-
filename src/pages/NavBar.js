import { useRef } from "react";
import { Disclosure } from "@headlessui/react";

import MobileButton from "../components/navbar/MobileButton";
import MobileLinks from "../components/navbar/MobileLinks";
import MainLinks from "../components/navbar/MainLinks";
import CardIcon from "../components/navbar/CardIcon";

const NavBar = ({ children }) => {
  const clickRef = useRef(null);

  const manageRef = () => {
    clickRef.current.click();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <MobileButton open={open} clickRef={clickRef} />
                <MainLinks />
                <CardIcon />
              </div>
            </div>
            <MobileLinks changeRef={manageRef} />
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
};

export default NavBar;
