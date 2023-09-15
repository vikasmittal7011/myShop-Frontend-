const Header = ({ heading }) => {
  return (
    <header
      className="bg-white shadow"
      style={{
        background:
          "linear-gradient(90deg, rgba(238, 130, 238, 1) 0%, rgba(0, 0, 255, 1) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {heading}
        </h1>
      </div>
    </header>
  );
};

export default Header;
