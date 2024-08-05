import React from "react";
import WelcomePointers from "./WelcomePointers";
import GavelIcon from "@mui/icons-material/Gavel";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GetAppIcon from "@mui/icons-material/GetApp";
import CustomInputForm from "./components/CustomInputForm";

import Styles from "./Welcome.module.css";

export default function Welcome({
  submitPrompt,
  keyword,
  primaryColor,
  textGradient,
}) {
  return (
    <div
      style={{
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
            primaryColor={primaryColor}
            onSubmit={submitPrompt}
          />
          {/* <div className={Styles.welcomePointerContainer}>
            <WelcomePointers
              style={{ gridColumn: "1/2" }}
              icon={GavelIcon}
              heading={"Legal Perspectives"}
              subHeading={`Acquire invaluable legal perspectives on any scenario or query concerning Indian law.`}
            />
            <WelcomePointers
              style={{ gridColumn: "2/3" }}
              icon={SupportAgentIcon}
              heading={"Tailored Support"}
              subHeading={`Obtain legal insights tailored to your specific circumstances by securely providing personal details within an end-to-end encrypted framework.`}
            />
            <WelcomePointers
              style={{ gridColumn: "3/4" }}
              icon={GetAppIcon}
              heading={"Case Retrieval"}
              subHeading={`Access highly contextual and relevant cases with just a single click.`}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
