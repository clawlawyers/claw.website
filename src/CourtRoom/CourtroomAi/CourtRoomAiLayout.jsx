// src/components/CourtRoomAiLayout.js

import React, { useState, useEffect } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import Styles from "./CourtroomAiLayout.module.css";
import splashVideo from "../../assets/images/door open.mp4";
import splashImage from "../../assets/images/splashImage.png";
import LogoSplash from "../../assets/images/logoSplash.png";

const CourtRoomAiLayout = () => {
  const [showSplash, setShowSplash] = useState(
    !localStorage.getItem("hasSeenSplash")
  );
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      localStorage.setItem("hasSeenSplash", "true");
    }
  }, [showSplash]);

  const handleVideoEnded = () => {
    setShowSplash(false);
  };

  const handleEnterCourtroom = () => {
    setVideoStarted(true);
    const videoElement = document.getElementById("splashVideo");
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Error playing the video:", error);
      });
    }
  };

  const handleExitCourtroom = () => {
    setShowSplash(true);
    setVideoStarted(false);
  };

  return (
    <div className="">
      {showSplash ? (
        <div className="flex flex-col justify-center  items-center h-screen w-full relative">
          {!videoStarted && (
            <img
              className={Styles.image}
              src={splashImage}
              alt="Background"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
              }}
            />
          )}

          {!videoStarted && (
            <div className="z-2 flex flex-col gap-10 mt-5 w-full h-screen justify-center items-center">
              <img className="h-max w-max" src={LogoSplash} alt="" />
              <button onClick={handleEnterCourtroom}>Enter Courtroom</button>
            </div>
          )}
          {videoStarted && (
            <video
              id="splashVideo"
              src={splashVideo}
              autoPlay
              muted
              onEnded={handleVideoEnded}
            />
          )}
        </div>
      ) : (
        <div className="h-screen grid grid-cols-1 md:grid-cols-[25%_75%] bg-gradient-to-r from-[#008080] to-[#0e1118]">
          <AiSidebar />
          <div className="flex flex-col w-full h-screen">
            <div className="m-3.5 border-2 border-black bg-[#008080] rounded flex flex-col h-screen">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtRoomAiLayout;
