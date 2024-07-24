import React, { useState } from "react";
import Lottie from "react-lottie";
import { motion } from "framer-motion";

const Dialog = ({
  open,
  onClose,
  title,
  text,
  buttonText,
  onButtonClick,
  lottieOptions,
  inputText,
  setInputText,
}) => {
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

        {/* Dialog Content */}
        <div className="text-center">
          <h1 className="text-2xl text-white font-bold mb-4">{title}</h1>
          {text && (
            <textarea
              className="w-full h-40 p-2.5 mb-4 text-black rounded-md resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          )}
          {lottieOptions && (
            <div className="my-4">
              <Lottie options={lottieOptions} height={150} width={150} />
            </div>
          )}
        </div>

        {/* Action Button */}
        {buttonText && (
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: "0.95" }}
              className="bg-white text-black rounded-md px-4 py-2 font-semibold"
              onClick={onButtonClick}
            >
              {buttonText}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
