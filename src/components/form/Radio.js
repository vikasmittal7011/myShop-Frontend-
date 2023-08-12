const Radio = ({ id, onChange, title, children }) => {
  const handleChange = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <div className="flex items-center gap-x-3 border border-1 border-gray-400 rounded-md p-3">
      <input
        onChange={handleChange}
        id={id}
        name={id}
        type="radio"
        className="cursor-pointer h-4 w-4 border-gray-800 text-indigo-600 focus:ring-indigo-600"
        value={title}
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
