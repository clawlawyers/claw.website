import React from "react";
import loginIcon from "../assets/images/loginIcon.gif";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  return (
    <div className="  bg-white max-w-4xl min-h-96 rounded-md mx-auto my-0">
      {/* Title */}
      <h2 className="text-3xl pt-3 font-bold text-teal-800 mb-6 text-center">
        Sign Up to Claw Legaltech
      </h2>

      {/* Card Container */}
      <div className="flex flex-col mx-auto my-0 md:flex-row bg-white rounded-md  w-full max-w-5xl">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 bg-white flex justify-center rounded-md items-center p-6 ">
          <img
            src={loginIcon}
            alt="Login Illustration"
            className="w-[50%] h-[50%] md:w-[90%] lg:w-[100%] "
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-100%  p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {/* Input Fields */}
            <input
              type="text"
              placeholder="Enter First Name"
              className="p-2 border text-black border-gray-300 rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="p-2 border border-gray-300 text-black rounded-lg  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              placeholder="Enter Valid Email ID *"
              className=" p-2 border border-gray-300 rounded-lg text-black  bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />

            {/* Mobile Number Input with Verification */}
            <div className="flex gap-2 col-span-2">
              <input
                type="number"
                placeholder="Enter Your Mobile Number *"
                className="p-2 flex-1 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-700 text-white px-4 py-2  rounded-lg hover:bg-teal-800 transition">
                Verify
              </button>
            </div>

            <input
              type="text"
              placeholder="Profession"
              className="p-2 border border-gray-300 text-black bg-[rgba(195,255,255,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Industry"
                className="p-2 border border-gray-300 rounded-lg text-black bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
              />
            </div>
            <div className="col-span-2">
              <select className="p-2 border border-gray-300 rounded-lg text-black bg-[rgba(195,255,255,1)] focus:outline-none focus:ring-2 focus:ring-teal-500 w-full">
                <option value="" disabled selected>
                  Purpose
                </option>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
                <option value="item3">Item 3</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-teal-700 text-white py-1 rounded-lg hover:bg-teal-800 transition">
            Continue
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <span className="text-gray-500">Registered Already? </span>
            <Link
              to="/login2"
              className="text-teal-700 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
