import React, { useState } from "react";
import "./ChatbotButton.css"; // Make sure to create the CSS file for styling
import AddIcon from "@mui/icons-material/Add";
import ChatbotImg from "../assets/icons/Chatbot.png";
import { Popover } from "@mui/material";
import Chatbot from "./Chatbot";

const ChatbotButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div onClick={handleClick} className="floating-button">
        <img className="w-14" src={ChatbotImg} />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="h-[450px] w-[350px] border">
          <Chatbot handleClose={handleClose} />
        </div>
      </Popover>
    </>
  );
};

export default ChatbotButton;
