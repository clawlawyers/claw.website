import React, { useState } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import Styles from "./CourtroomAiLayout.module.css";
import splashVideo from "../../assets/images/door open.mp4";

const CourtRoomAiLayout = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);

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

  return (
    <div >
      {showSplash ? (
        <div style={{
          backgroundImage:'url("../../assets/images/splashImage.png")'
        }} className="flex flex-col justify-center items-center h-screen w-full ">
          {!videoStarted && (
            <div className="">

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
        <div className="flex flex-col justify-end w-full h-screen">
          <AiSidebar />
          <div className={Styles.rightContainer}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtRoomAiLayout;
