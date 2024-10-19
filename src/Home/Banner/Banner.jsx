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
          <div style={{ flex: 1, paddingBottom: "10px" }} />
          {/* <div className={Style.typed}>with LegalGPT</div> */}
          <TypeAnimation
            sequence={[
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
              color: "rgb(0, 200, 128)",
              fontSize: "6.5vw",
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
