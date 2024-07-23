import React from "react";
import Lottie from "react-lottie";

const Dialog = ({ open, onClose, title, text, buttonText, onButtonClick, lottieOptions }) => {
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
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
              fillRule="nonzero"
            />
          </svg>
        </div>
        
        {/* Dialog Content */}
        <div className="text-center">
          <h1 className="text-2xl text-white font-bold mb-4">{title}</h1>
          {text && (
            <textarea
              className="w-full h-40 p-2.5 mb-4 text-black rounded-md resize-none"
              value={text}
              
            />
          )}
          {lottieOptions && (
            <div className="my-4">
              <Lottie
                options={lottieOptions}
                height={150}
                width={150}
              />
            </div>
          )}
        </div>
        
        {/* Action Button */}
        {buttonText && (
            <div className="flex justify-center">
          <button
            className="bg-white text-black rounded-md px-4 py-2 font-semibold"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default Dialog;
