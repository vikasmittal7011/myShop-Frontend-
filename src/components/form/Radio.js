import React from "react";

const Radio = ({ id, onChange, value, children }) => {
  const handleChange = (e) => {
    onChange(id, e.target.value);
  };

  console.log(children);

  return (
    <div className="flex items-center gap-x-3">
      <input
        onChange={handleChange}
        id={id}
        name={id}
        type="radio"
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        value={value}
      />
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {children}
      </label>
    </div>
  );
};

export default Radio;
