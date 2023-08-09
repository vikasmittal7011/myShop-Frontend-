import React from "react";

const Image = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className || "h-full w-full object-cover object-center"}
    />
  );
};

export default Image;
