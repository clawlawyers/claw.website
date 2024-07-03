// HoverCard.js
import React from "react";
import "./HoverCard.css";

const HoverCard = () => {
  return (
    <div className="cardContainer">
      <div style={{ height: "100%" }} className="card layer1"></div>
      <div style={{ height: "100%" }} className="card layer2"></div>
      <div style={{ height: "100%" }} className="card layer3"></div>
      <div style={{ height: "100%" }} className="card layer4"></div>
      <div className="card mainCard">
        <div className="cardContent">
          <h3>Monthly</h3>
          <p>&#8377; 250 /-</p>
          <p>Items: Tokens</p>
          <p>Token Count: 100</p>
          <p>Users/Sessions: 1</p>
          <button>Get it now</button>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
