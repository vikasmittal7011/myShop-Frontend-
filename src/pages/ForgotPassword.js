import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo.png";
import Input from "../components/form/Input";
import Links from "../components/common/Link";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import {
  clearMessage,
  forgetPasswordRequestAsync,
  selectauth,
} from "../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { message, sendMail, status } = useSelector(selectauth);
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
      dispatch(forgetPasswordRequestAsync(email));
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Send Password Reset Request
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
              title="Email address"
              id="email"
              type="email"
              placeHolder="Enter your gamil address..."
              value={email}
              onChange={manageEmail}
              errorMessage={wrongEmail}
            />
            <div>
              {!sendMail && (
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Mail
                </Button>
              )}
              {sendMail && (
                <p className="text-green-600 my-3 font-bold text-2xl text-center">
                  Request Is Send To Your Mail
                </p>
              )}
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
