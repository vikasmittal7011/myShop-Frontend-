import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Links from "./Links";
import logo from "../../assets/logo.png";
import { selectauth } from "../../features/auth/authSlice";
import { adminNavLinks, userNavLinks } from "../../utils/constant";

const MainLinks = () => {
  const history = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector(selectauth);
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
            {loggedInUser.role === "user"
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
