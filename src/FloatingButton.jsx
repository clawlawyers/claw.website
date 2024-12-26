import React from "react";
import "./FloatingButton.css"; // Make sure to create the CSS file for styling
import AddIcon from "@mui/icons-material/Add";

const FloatingButton = () => {
  const handleClick = () => {
    // Your button action here
    console.log("Button clicked!");
  };

  return (
    <button className="floating-button" onClick={handleClick}>
      <AddIcon fontSize="large" />
    </button>
  );
};

export default FloatingButton;
