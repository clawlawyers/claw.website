import React from "react";
import LegalGptBanner from "./LegalGptBanner";
import CaseSearchBanner from "./CaseSearchBanner";
import AdiraAiBanner from "./AdiraAiBanner";
import WarRoomBanner from "./WarRoomBanner";

const VideoBannerHome = () => {
  return (
    <div className="m-auto w-[80%] flex flex-col justify-center items-center pt-24 gap-10">
      <div className="flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-bold text-5xl lg:text-7xl m-0">Your Guide to</h1>
        <h3
          style={{
            background: "linear-gradient(rgb(0, 128, 128), rgb(0, 200, 128))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2"
        >
          AI Powered Legal Research
        </h3>
      </div>

      <LegalGptBanner />
      <CaseSearchBanner />
      <WarRoomBanner />
      <AdiraAiBanner />
    </div>
  );
};

export default VideoBannerHome;
