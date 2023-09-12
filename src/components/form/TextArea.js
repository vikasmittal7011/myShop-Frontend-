const Input = ({
  title,
  id,
  className,
  placeHolder,
  value,
  onChange,
  errorMessage,
  row,
  required,
}) => {
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
        <textarea
          rows={row || 3}
          id={id}
          name={id}
          autoComplete="current-password"
          required={required}
          className={`${
            className ||
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }`}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
        />
      </div>
      <p className="text-red-600">{errorMessage || null}</p>
    </div>
  );
};

export default Input;
