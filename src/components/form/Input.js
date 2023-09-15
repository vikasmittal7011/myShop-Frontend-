import Links from "../common/Link";

const Input = ({
  title,
  id,
  type,
  className,
  showLink = false,
  linkText,
  linkNavigate,
  linkClass,
  placeHolder,
  value,
  onChange,
  minLength,
  errorMessage,
  min,
  max,
  step,
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
        {showLink && (
          <div className="text-sm">
            <Links
              to={linkNavigate}
              className={`${
                linkClass ||
                "font-semibold text-indigo-600 hover:text-indigo-500"
              }`}
              name={linkText}
            />
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete="current-password"
          required
          className={`${
            className ||
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }`}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
          minLength={minLength}
          min={min}
          max={max}
          step={step}
        />
      </div>
      <p className="text-red-600">{errorMessage || null}</p>
    </div>
  );
};

export default Input;
