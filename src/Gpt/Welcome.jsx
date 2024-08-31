import React from "react";
import WelcomePointers from "./WelcomePointers";
import hammer from "../assets/images/hammer.png";
import headset from "../assets/images/headset.png";
import uploadIcon from "../assets/images/upload.png";
import CustomInputForm from "./components/CustomInputForm";

import Styles from "./Welcome.module.css";

export default function Welcome({
  submitPrompt,
  keyword,
  primaryColor,
  textGradient,
}) {
  let containerStyles = { width: "80%" };
  return (
    <div
      className="my-[20px] md:my-0"
      style={{
        overflow: "auto",
        backgroundColor: "transparent",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "transparent", width: "100%" }}>
        <div
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              fontSize: "48px",
              fontWeight: 700,
              color: "#E5E5E5",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                padding: 3,
                borderLeft: `4px solid ${primaryColor}`,
                background: `linear-gradient(to right, ${textGradient[0]}, ${textGradient[1]} 100%)`,
              }}
            >
              {keyword}GPT
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              paddingTop: 10,
              fontSize: 16,
              background: "inherit",
            }}
          >
            The power of AI for your {keyword} service
          </div>
        </div>
        <div className={Styles.secondaryContainer}>
          <CustomInputForm
            containerStyles={containerStyles}
            primaryColor={primaryColor}
            onSubmit={submitPrompt}
          />
          <div className="grid md:grid-cols-3 px-3 md:gap-5">
            <div className="flex flex-col gap-2 items-center justify-center text-center">
              <img src={hammer} />
              <h3>Legal Perspectives</h3>
              <p>
                Acquire invaluable legal perspectives on any scenario or query
                concerning Indian law.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center text-center">
              <img src={headset} />
              <h3>Tailored Support</h3>
              <p>
                Obtain legal insights tailored to your specific circumstances by
                securely providing personal details within an end-to-end
                encrypted framework.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center text-center">
              <img src={uploadIcon} />
              <h3>Case Retrieval</h3>
              <p>
                Access highly contextual and relevant cases with just a single
                click.
              </p>
            </div>
            {/* <WelcomePointers
              style={{ gridColumn: "3/4" }}
              icon={uploadIcon}
              heading={"Case Retrieval"}
              subHeading={`Access highly contextual and relevant cases with just a single click.`}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
