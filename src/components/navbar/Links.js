import { Link } from "react-router-dom";

const Links = ({ className, to, name, history, onClick }) => {
  const baseClass = "rounded-md px-3 py-2 text-sm font-medium";

  const currentClassess =
    to === history
      ? `bg-gray-900 text-white ${baseClass}`
      : `text-gray-300 hover:bg-gray-700 hover:text-white ${baseClass}`;

  return (
    <Link
      to={to}
      className={`${className || currentClassess}`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default Links;
