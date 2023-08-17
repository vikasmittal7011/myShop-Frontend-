import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import logo from "../../assets/logo.png";
import { footerLinks } from "../../utils/constant";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();

  const LINK = (icon) => (
    <Link className="hover:opacity-75" to>
      {icon}
    </Link>
  );

  return (
    <>
      <footer
        style={{
          background:
            "linear-gradient(179deg, rgba(0, 255, 235, 0.35) 0%, rgba(7, 58, 187, 0.72) 100%)",
        }}
      >
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <img src={logo} className="mr-5 h-6 sm:h-9" alt="logo" />
              <p className="max-w-xs mt-4 text-sm text-gray-600">
                Buy want you want, we have all the variety.
              </p>
              <div className="flex mt-8 space-x-6 text-gray-600">
                {LINK(<FaFacebook className="w-6 h-6" />)}
                {LINK(<FaInstagram className="w-6 h-6" />)}
                {LINK(<FaTwitter className="w-6 h-6" />)}
                {LINK(<FaGithub className="w-6 h-6" />)}
                {LINK(<FaDribbble className="w-6 h-6" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              {footerLinks.map((link, i) => (
                <div key={i}>
                  <p className="font-medium">{link.id}</p>
                  <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                    {link.options.map((c, i) => (
                      <Link
                        key={i}
                        className="hover:opacity-75 cursor-pointer"
                        to
                      >
                        {c.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-800">© {date} My Shop</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
