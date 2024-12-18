import React from "react";
import loginIcon from "../assets/images/loginIcon.gif";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      {/* Main Card */}
      <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-teal-800 py-6">
          Log In to Claw Legaltech
        </h2>

        <div className="flex flex-col md:flex-row">
          {/* Left Section: Image */}
          <div className="flex items-center justify-center md:w-1/2 bg-white">
            <img
              src={loginIcon}
              alt="Login Illustration"
              className="w-[50%] h-[50%] md:w-[90%] lg:w-[100%] "
            />
          </div>

          {/* Right Section: Form */}
          <div className="flex-1 p-6 md:p-10">
            {/* Input: Mobile Number */}
            <div className="mb-6">
              <input
                type="number"
                placeholder="Enter Valid Mobile Number *"
                className="w-full p-3 border border-gray-300 text-gray-700 bg-[rgba(195,255,255,1)] rounded-md focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>

            {/* Continue Button */}
            <button className="w-full bg-teal-700 text-white p-3 rounded-md hover:bg-teal-800 transition duration-300">
              Continue
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Sign-In */}
            <button className="w-full flex items-center justify-center border border-gray-300 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </button>

            {/* Footer Links */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                New to Claw Legal Tech?{" "}
                <Link
                  to="/signup1"
                  className="text-teal-700 font-semibold hover:underline">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
