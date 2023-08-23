import { useDispatch } from "react-redux";
import React, { useState } from "react";

import Input from "../components/form/Input";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import NavBar from "./NavBar";
import { createBrandAsync } from "../features/brand/brandSlice";

const CreateBrand = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");

  const handleBrandInfo = (id, value) => {
    setName(value);
  };

  const validation = (name) => {
    if (name === "") {
      setErrors("Enter valid brand name");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validation(name);
    if (valid) {
      dispatch(createBrandAsync({ name: name }));
      setName("");
    }
  };

  return (
    <>
      <NavBar>
        <Header heading="Add New Brand" />
        <form onSubmit={handleSubmit} className="m-10">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <Input
                    id="name"
                    title="Brand Name"
                    type="text"
                    placeHolder="Enter brand name..."
                    value={name}
                    onChange={handleBrandInfo}
                    errorMessage={errors}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  onClick={() => {
                    setName("");
                  }}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Brand
                </Button>
              </div>
            </div>
          </div>
        </form>
      </NavBar>
    </>
  );
};

export default CreateBrand;
