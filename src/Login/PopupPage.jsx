import React from "react";

const LegalBusinessNeeds = () => {
  return (
    <div className="bg-gradient-to-b from-teal-800 to-gray-900 min-h-screen flex items-center justify-center">
      {/* Main Card */}
      <div className="bg-gray-900 border border-teal-400 rounded-lg max-w-4xl w-full p-6 md:p-12 text-white shadow-lg relative">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-white text-2xl hover:text-teal-400 transition">
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Simplify Your Legal & Business Needs!
        </h2>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Column 1: Legal Consultation */}
          <div>
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Legal Consultation</h3>
            <p className="text-sm text-gray-400">
              Book a consultation with experienced lawyers at an affordable
              price.
            </p>
          </div>

          {/* Column 2: GST Compliance */}
          <div>
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">🧾</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">GST Compliance</h3>
            <p className="text-sm text-gray-400">
              Stay compliant and avoid penalties with our hassle-free solutions.
            </p>
          </div>

          {/* Column 3: Startup Registration */}
          <div>
            <div className="flex justify-center mb-4">
              {/* Icon */}
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Startup Registration</h3>
            <p className="text-sm text-gray-400">
              From incorporation to licenses, we help you get started
              seamlessly.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 text-center">
          <button className="bg-teal-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-teal-500 transition">
            Get It Now
          </button>
          <p className="text-gray-400 mt-4 cursor-pointer hover:underline">
            Maybe Later
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalBusinessNeeds;
