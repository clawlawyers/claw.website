import React, { useState } from "react";
import Warroom from "../WarRoomBanner";
import Adira from "../AdiraAiBanner";
import CaseSearch from "../CaseSearchBanner";
import LegalGPT from "../LegalGptBanner";

const buttonComponents = [
  {
    name: "LegalGPT",
    component: <LegalGPT />,
  },
  {
    name: "Case Search",
    component: <CaseSearch />,
  },
  {
    name: "WarRoom",
    component: <Warroom />,
  },
  {
    name: "Adira AI",
    component: <Adira />,
  },
];

const VideoBanner = () => {
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  return (
    <div id="videoBanner" className="w-[95%] m-auto flex flex-col gap-3">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {buttonComponents.map((button, index) => (
          <button
            key={index}
            onClick={() => setActiveComponentIndex(index)}
            className={`w-[26rem] rounded-full px-4 py-2 transition-all ${
              activeComponentIndex === index
                ? "bg-rgba(0,129,127,0.2) text-white border-white"
                : "bg-gray-700 text-gray-300 border-[rgba(0,255,157,1)] hover:bg-gray-500 hover:text-white"
            }`}
            style={{
              border: "2px solid rgba(0,255,157,1)",
            }}>
            {button.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Render Active Component */}
      <div className="border-2 rounded-lg p-2 flex flex-col gap-3">
        {buttonComponents[activeComponentIndex].component}
      </div>
    </div>
  );
};

export default VideoBanner;
