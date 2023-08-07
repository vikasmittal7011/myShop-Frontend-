import React, { useState } from "react";

import logo from "../assets/logo.png";
import Links from "../components/common/Link";
import Input from "../components/form/Input";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const manageCredentials = (id, value) => {
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <Input
            title="Email address"
            id="email"
            type="email"
            placeHolder="Enter your gamil address..."
            value={credentials.email}
            onChange={manageCredentials}
          />
          <Input
            title="Password"
            id="password"
            type="password"
            showLink={true}
            linkText="Forget Password?"
            linkNavigate="/"
            placeHolder="Enter your password..."
            value={credentials.password}
            onChange={manageCredentials}
            minLength={8}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
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
  );
};

export default Login;
