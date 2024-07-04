import React, { useEffect, useRef } from "react";
import cvideo from "./Clawv.mp4";
const Demovideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const playPromise = videoElement.play();
      console.log(playPromise);
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            // Show playing UI.
            console.log("Automatic playback started!");
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
            console.log("Automatic playback prevented.");
          });
      }
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "-1002",
      }}
    >
      <video ref={videoRef} width="600" controls autoPlay muted>
        <source src={cvideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Demovideo;
