import React, { useState } from "react";

import logo from "../assets/logo.png";
import Links from "../components/common/Link";
import Input from "../components/form/Input";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectauth } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(selectauth);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    validform: false,
  });

  const manageCredentials = (id, value) => {
    setCredentials({ ...credentials, [id]: value });
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      validform: false,
    });
  };

  const validate = (email, password, confirmPassword) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!emailPattern.test(email)) {
      setErrors({
        ...errors,
        email: "Enter a valid email address!",
        validform: false,
      });
    } else if (!passwordPattern.test(password)) {
      setErrors({
        ...errors,
        password: `- at least 8 characters\n
      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
      - Can contain special characters`,
        validform: false,
      });
    } else if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: `Password should be match`,
        validform: false,
      });
    } else {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        validform: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(
      credentials.email,
      credentials.password,
      credentials.confirmPassword
    );
    if (errors.validform) {
      dispatch(
        createUserAsync({
          email: credentials.email,
          password: credentials.password,
        })
      );
      setCredentials({
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (loggedInUser) {
        navigate("/");
      }
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="to" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              title="Email address"
              id="email"
              type="email"
              placeHolder="Enter your gamil address..."
              value={credentials.email}
              onChange={manageCredentials}
              errorMessage={errors.email}
            />
            <Input
              title="Password"
              id="password"
              type="password"
              placeHolder="Enter your password..."
              value={credentials.password}
              onChange={manageCredentials}
              minLength={8}
              errorMessage={errors.password}
            />
            <Input
              title="Confirm Password"
              id="confirmPassword"
              type="password"
              placeHolder="Enter password again..."
              value={credentials.confirmPassword}
              onChange={manageCredentials}
              minLength={8}
            />
            <p className="text-red-600">{errors.confirmPassword || null}</p>
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Alrady have a member?{" "}
            <Links
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              name="Continue Shopping"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
