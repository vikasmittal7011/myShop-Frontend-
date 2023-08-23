const ImageInput = ({
  title,
  id,
  onChange,
  errorMessage,
  className,
  multiple = false,
}) => {
  const handleChange = (e) => {
    onChange(id, multiple ? e.target.files : e.target.files[0]);
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
        <input
          id={id}
          name={id}
          type="file"
          autoComplete="current-password"
          required
          className={`${
            className ||
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }`}
          onChange={handleChange}
          multiple={multiple}
        />
      </div>
      <p className="text-red-600">{errorMessage || null}</p>
    </div>
  );
};

export default ImageInput;
