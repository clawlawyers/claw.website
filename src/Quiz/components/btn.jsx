import React, { useState } from "react";
import "./BlinkingButton.css"; // Make sure to import the CSS file

const BlinkingButton = () => {
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => setIsFading(false), 1000); // Stop fading after 2 seconds
  };

  return (
    <button
      onClick={handleClick}
      className={`button ${isFading ? "fading" : ""}`}
    >
      Click Me
    </button>
  );
};

export default BlinkingButton;
