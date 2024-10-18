import React from "react";
import Style from "./Banner.module.css";
import { TypeAnimation } from "react-type-animation";

function Banner() {
  return (
    <div className={Style.bannerContainer}>
      <h1 className={Style.banner}>
        <div>Unlock Legal Assistance</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }} />
          {/* <div className={Style.typed}>with LegalGPT</div> */}
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "with LegalGPT",
              2000,
              "",
              2000,
              "",
              "with Adira",
              2000,
              "",
              2000,
            ]}
            wrapper="span"
            speed={1}
            style={{
              // color: "rgb(0, 200, 128)",
              background: "linear-gradient(rgb(0, 128, 128), rgb(0, 200, 128))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              fontSize: "5rem",
              fontWeight: "700",
              display: "inline-block",
            }}
            repeat={Infinity}
          />
          <div style={{ flex: 1 }} />
        </div>
      </h1>
    </div>
  );
}

export default Banner;
