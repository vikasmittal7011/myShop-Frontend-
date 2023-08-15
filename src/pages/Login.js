import React, { useState } from "react";

import logo from "../assets/logo.png";
import Links from "../components/common/Link";
import Input from "../components/form/Input";
import Button from "../components/common/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectauth } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { loggedInUser, message, status } = useSelector(selectauth);

  const [credentials, setCredentials] = useState({
    email: "vikas@gmail.com",
    password: "Sonu@9876",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    validform: false,
  });

  const manageCredentials = (id, value) => {
    setCredentials({ ...credentials, [id]: value });
    setErrors({
      email: "",
      password: "",
    });
  };

  const validate = (email, password) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!emailPattern.test(email)) {
      setErrors({
        ...errors,
        email: "Enter a valid email address!",
      });
      return false;
    } else if (!passwordPattern.test(password)) {
      setErrors({
        ...errors,
        password: `- at least 8 characters\n
      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
      - Can contain special characters`,
      });
      return false;
    } else {
      setErrors({
        email: "",
        password: "",
      });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validform = validate(credentials.email, credentials.password);
    if (validform) {
      dispatch(
        loginUserAsync({
          email: credentials.email,
          password: credentials.password,
        })
      );
      if (loggedInUser && status === "idle") {
        navigate("/");
      }
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <p className="text-red-600">{message?.message || null}</p>
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
              showLink={true}
              linkText="Forget Password?"
              linkNavigate="/forgot-password"
              placeHolder="Enter your password..."
              value={credentials.password}
              onChange={manageCredentials}
              minLength={8}
              errorMessage={errors.password}
            />
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
            Not a member?{" "}
            <Links
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              name="Become a member"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
