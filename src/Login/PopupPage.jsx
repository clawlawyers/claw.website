import React from "react";
import Legal from "../assets/Legal.png";
import Gst from "../assets/gst.png";
import Startup from "../assets/startup.png";

const LegalBusinessNeeds = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-0">
      {/* Main Card */}
      <div className="bg-gray-900 border border-teal-400 rounded-lg max-w-4xl w-full md:pt-8 px-6 text-white shadow-lg relative">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-white text-2xl bg-gray-900 hover:text-gray-500 transition">
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Simplify Your Legal & Business Needs!
        </h2>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 text-center gap-y-8 md:gap-y-0">
          {/* Column 1: Legal Consultation */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">
                <img src={Legal} className="w-8 h-8" alt="LegalLogo" />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Legal Consultation</h3>
            <p className="text-sm text-gray-400">
              Book a consultation with experienced lawyers at an affordable
              price.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block md:mx-12 w-[1px] bg-gray-600 h-full"></div>

          {/* Column 2: GST Compliance */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">
                <img src={Gst} className="w-8 h-8" alt="GstLogo" />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">GST Compliance</h3>
            <p className="text-sm text-gray-400">
              Stay compliant and avoid penalties with our hassle-free solutions.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block md:mx-12 w-[1px] bg-gray-600 h-full"></div>

          {/* Column 3: Startup Registration */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">
                <img src={Startup} className="w-8 h-8" alt="StartupLogo" />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Startup Registration</h3>
            <p className="text-sm text-gray-400">
              From incorporation to licenses, we help you get started
              seamlessly.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center items-end gap-2 w-full">
          {/* Primary Button */}
          <button className="bg-teal-400 h-8 flex items-center justify-center text-black w-60 font-semibold text-lg px-8 rounded-md hover:bg-teal-500 transition">
            Get It Now
          </button>

          {/* Secondary Text */}
          <p className="text-gray-400 text-sm  mr-20 p-0 cursor-pointer justify-center hover:underline">
            Maybe Later
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalBusinessNeeds;
