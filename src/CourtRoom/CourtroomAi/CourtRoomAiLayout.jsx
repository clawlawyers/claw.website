import React, { useState } from "react";
import AiSidebar from "./AiSidebar";
import { Outlet } from "react-router-dom";
import Styles from "./CourtroomAiLayout.module.css";
import splashVideo from "../../assets/images/door open.mp4";
import splashImage from "../../assets/images/splashImage.png"
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
       <div className="flex flex-col justify-center items-center h-screen w-full bg-red-500 relative">
       <img
         src={splashImage}
         alt="Background"
         style={{
           position: 'absolute',
           width: '100%',
           height: '100%',
           objectFit: 'cover',
           zIndex: -1,
         }}
       />
       {!videoStarted && (
         <div>
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
        <div className={Styles.mainContainer}>
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
