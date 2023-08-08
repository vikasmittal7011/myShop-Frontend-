import React from "react";

const Select = ({ title, id, onChange, options, defaultValue }) => {
  const handleChange = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
      </div>
      <div className="mt-2">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
          <option value="">{defaultValue}</option>
          {options?.map((o, i) => (
            <option key={i} value={o.name}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
