import React, { forwardRef } from "react";

import FeatureCard from "./FeatureCard";
import Styles from "./Features.module.css";

import banner1 from "../../assets/icons/banner1.png";
import banner2 from "../../assets/icons/banner2.png";
import banner3 from "../../assets/icons/banner3.png";

export default forwardRef(function Features(props, ref) {
  return (
    <div ref={ref} style={{ width: "100%", paddingTop: 80, color: "white" }}>
      <div style={{ width: "100%" }}>
        <h3 className={Styles.featuresSubHeading}>
          Seamless Tool, Trusted Guidance
        </h3>
        <h1 className={Styles.featuresHeading}>
          {" "}
          Explore Powerful
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "relative",
                background: "transparent",
                zIndex: 10,
              }}>
              Features
            </span>
            <div
              style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                left: 0,
                height: 12,
                backgroundColor: "#008080",
              }}
            />
          </span>
        </h1>
      </div>
      <div className={Styles.featuresCardContainer}>
        <FeatureCard
          imageSrc={banner1}
          heading={"Legal Perspectives"}
          subHeading={
            "Acquire invaluable legal perspectives on any scenario or query concerning Indian law."
          }
        />
        <FeatureCard
          imageSrc={banner2}
          heading={"Tailored Support"}
          subHeading={
            "Obtain legal insights tailored to your specific circumstances by securely providing personal details within an end-to-end encrypted framework."
          }
        />
        <FeatureCard
          imageSrc={banner3}
          heading={"Case Retrieval"}
          subHeading={
            "Access highly contextual and relevant cases with just a single click."
          }
        />
      </div>
    </div>
  );
});
