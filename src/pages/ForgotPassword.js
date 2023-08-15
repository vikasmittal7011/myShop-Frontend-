import React, { useState } from "react";

import logo from "../assets/logo.png";
import Links from "../components/common/Link";
import Input from "../components/form/Input";
import Button from "../components/common/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [wrongEmail, setWrongEmail] = useState("");

  const manageEmail = (id, value) => {
    setEmail(value);
    setWrongEmail("");
  };

  const validate = (email) => {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!emailPattern.test(email)) {
      setWrongEmail("Enter a valid email address!");
      return false;
    } else {
      setWrongEmail("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validform = validate(email);
    if (validform) {
      console.log(email);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              title="Email address"
              id="email"
              type="email"
              placeHolder="Enter your gamil address..."
              value={email}
              onChange={manageEmail}
              errorMessage={wrongEmail}
            />
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Mail
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

export default ForgotPassword;
