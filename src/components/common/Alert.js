import { useDispatch, useSelector } from "react-redux";
import { removeAlertAsync, selectalert } from "../../features/alert/alertSlice";
import { useEffect } from "react";

const Alert = () => {
  const { message, color, type } = useSelector(selectalert);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlertAsync());
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (!message) {
    return;
  }

  return (
    <div
      className={`w-full fixed top-0 bg-${color}-200 border-l-4 border-${color}-500 text-${color}-700 p-4`}
    >
      <div className="flex">
        <div className="flex space-x-2">
          <p className="font-bold m-auto">{type} :- </p>
          <p className="text-sm m-auto">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
