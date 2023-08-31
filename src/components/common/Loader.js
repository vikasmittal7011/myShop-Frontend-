import loader from "../../assets/loader.gif";

const Loader = ({ width, height }) => {
  return (
    <div className={`flex justify-center my-52`}>
      <img
        src={loader}
        alt="Loading"
        width={width || 150}
        height={height || 150}
      />
    </div>
  );
};

export default Loader;
