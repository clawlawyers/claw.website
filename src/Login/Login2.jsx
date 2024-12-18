import React from "react";
import loginIcon from "../assets/images/loginIcon.gif";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Sign Up to Claw Legaltech
      </h2>

      {/* Card Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-5xl">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 bg-gray-200 flex justify-center items-center p-6 rounded-t-lg md:rounded-l-lg md:rounded-t-none">
          <img
            src={loginIcon}
            alt="Login Illustration"
            className="w-[60%] h-[80%] md:w-[90%] lg:w-[100%] "
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Input Fields */}
            <input
              type="text"
              placeholder="Enter First Name"
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              placeholder="Enter Valid Email ID *"
              className=" p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />

            {/* Mobile Number Input with Verification */}
            <div className="flex gap-2 col-span-2">
              <input
                type="number"
                placeholder="Enter Your Mobile Number *"
                className="p-1 flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-700 text-white px-4 py-3 rounded-lg hover:bg-teal-800 transition">
                Verify
              </button>
            </div>

            <input
              type="text"
              placeholder="Profession"
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />
            <input
              type="text"
              placeholder="Industry"
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />
            <input
              type="text"
              placeholder="Purpose"
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 col-span-2"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-teal-700 text-white py-1 rounded-lg hover:bg-teal-800 transition">
            Continue
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <span className="text-gray-500">Registered Already? </span>
            <a
              href="#login"
              className="text-teal-700 font-semibold hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
