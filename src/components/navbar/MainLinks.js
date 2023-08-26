import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Links from "./Links";
import logo from "../../assets/logo.png";
import { adminNavLinks, userNavLinks } from "../../utils/constant";
import { selectuser } from "../../features/user/userSlice";

const MainLinks = () => {
  const history = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector(selectuser);
  return (
    <>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div
          className="flex flex-shrink-0 items-center"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="h-8 w-auto cursor-pointer" src={logo} alt="My Shop" />
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {userData.role === "user"
              ? userNavLinks.map((item) => (
                  <Links
                    key={item.name}
                    history={history.pathname}
                    to={item.href}
                    name={item.name}
                  />
                ))
              : adminNavLinks.map((item) => (
                  <Links
                    key={item.name}
                    history={history.pathname}
                    to={item.href}
                    name={item.name}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLinks;
