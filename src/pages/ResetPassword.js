import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo.png";
import Input from "../components/form/Input";
import Links from "../components/common/Link";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import {
  clearMessage,
  resetPasswordAsync,
  selectauth,
} from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ResetPassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const defaultValue = {
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const { message, status, resetPassword } = useSelector(selectauth);
  const [passwords, setPasswords] = useState(defaultValue);

  const [wrongValues, setWrongValues] = useState(defaultValue);

  const handlePassword = (id, value) => {
    setPasswords({ ...passwords, [id]: value });
    setWrongValues(defaultValue);
  };

  const validate = (data) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordPattern.test(data.password)) {
      setWrongValues({
        password: `- at least 8 characters\n
          - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
          - Can contain special characters`,
      });
      return false;
    } else if (data.password !== data.confirmPassword) {
      setWrongValues({
        confirmPassword: `Password should be match`,
      });
      return false;
    } else {
      setWrongValues(defaultValue);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validform = validate(passwords);
    if (validform) {
      dispatch(
        resetPasswordAsync({ token: token, password: passwords.password })
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);
  }, [message?.message, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  if (resetPassword) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          {message && (
            <p className="text-red-600 my-3 font-bold text-2xl capitalize">
              {message?.message}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              title="New Password"
              id="password"
              type="password"
              placeHolder="Enter your password..."
              value={passwords.password}
              onChange={handlePassword}
              minLength={8}
              errorMessage={wrongValues.password}
            />
            <Input
              title="Confirm Password"
              id="confirmPassword"
              type="password"
              placeHolder="Enter password again..."
              value={passwords.confirmPassword}
              onChange={handlePassword}
              minLength={8}
              errorMessage={wrongValues.confirmPassword}
            />
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Chnage Password
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Links
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              name="Login"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
