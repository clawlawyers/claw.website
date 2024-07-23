import React from "react";
import Lottie from "react-lottie";

const Dialog = ({ open, onClose, title, text, buttonText, onButtonClick, lottieOptions, setOnChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#0e1118] to-[#008080] w-2/4 max-w-2/4 border border-white rounded-md p-4 h-96 relative">
        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <svg
            onClick={onClose}
            className="cursor-pointer"
            width="30"
            height="30"
            fill="white"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-white mb-4">
          {title}
        </h2>

        {/* Lottie Animation */}
        {lottieOptions && (
          <div className="flex items-center justify-center">
            <Lottie options={lottieOptions} height={250} width={250} />
          </div>
        )}

        {/* Text or Textarea */}
        {!lottieOptions && (
          <div className="bg-transparent border rounded-md p-2.5 mb-4 text-black">
            {text}
          </div>
        )}
        

        {/* Button */}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="w-full p-2.5 bg-blue-500 text-white rounded-md"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialog;
