import { Link } from "react-router-dom";

const Links = ({ className, to, name, onClick }) => {
  return (
    <Link to={to} className={`${className || ""}`} onClick={onClick}>
      {name}
    </Link>
  );
};

export default Links;
