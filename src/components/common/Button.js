import React from "react";

const Button = ({ name, type, className, onClick }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
