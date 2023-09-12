const CheckBox = ({ id, className, onChange, values, title }) => {
  const handleChange = (e) => {
    onChange(e.target.value, e);
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
        <div className="flex">
          {values?.map((v, i) => (
            <div key={i} className="flex">
              <input
                id={id}
                name={id}
                type="checkbox"
                value={v.id}
                className={`${
                  className ||
                  "rounded-md border-0 m-1.5 text-indigo-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
                }`}
                onChange={handleChange}
                checked={v.checked}
              />
              <p className="block text-sm mt-0.5 leading-6 text-gray-900">
                {v.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
