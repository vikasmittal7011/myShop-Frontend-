import React, { useState } from "react";

import logo from "../assets/logo.png";
import Links from "../components/common/Link";
import Input from "../components/form/Input";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectauth } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const { loggedInUser, message, status } = useSelector(selectauth);
  const [credentials, setCredentials] = useState({
    name: "Test",
    email: "test@gmail.co",
    password: "Test@9876",
    confirmPassword: "Test@9876",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const manageCredentials = (id, value) => {
    setCredentials({ ...credentials, [id]: value });
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validate = (data) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (data.name === "") {
      setErrors({
        ...errors,
        email: "Enter a valid name!",
      });
      return false;
    } else if (!emailPattern.test(data.email)) {
      setErrors({
        ...errors,
        email: "Enter a valid email address!",
      });
      return false;
    } else if (!passwordPattern.test(data.password)) {
      setErrors({
        ...errors,
        password: `- at least 8 characters\n
        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
        - Can contain special characters`,
      });
      return false;
    } else if (data.password !== data.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: `Password should be match`,
      });
      return false;
    } else {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
      });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate(credentials);
    if (valid) {
      dispatch(
        createUserAsync({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        })
      );
      if (status !== "failed") {
        setCredentials({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <p className="text-red-600">{message?.message || null}</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              title="Name"
              id="name"
              type="text"
              placeHolder="Enter your name..."
              value={credentials.name}
              onChange={manageCredentials}
              errorMessage={errors.name}
            />
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
