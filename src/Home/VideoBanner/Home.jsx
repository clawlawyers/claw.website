import React from "react";
import LegalGptBanner from "./LegalGptBanner";
import CaseSearchBanner from "./CaseSearchBanner";

const VideoBannerHome = () => {
  return (
    <div className="m-auto w-[80%] flex flex-col justify-center items-center pt-24 gap-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl md:text-[70px] m-0">Your Guide to</h1>
        <h3
          style={{
            background: "linear-gradient(rgb(0, 128, 128), rgb(0, 200, 128))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "4rem",
            fontWeight: "700",
            display: "inline-block",
          }}
        >
          AI Powered Legal Research
        </h3>
      </div>
      <LegalGptBanner />
      <CaseSearchBanner />
    </div>
  );
};

export default VideoBannerHome;
