import React from "react";
import logo from "../../assets/images/claw-login.png";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Styles from "./BaseAiForm.module.css";

const BaseAiForm = () => {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.leftContainer}>
        {/* top container */}
        <div
          style={{
            background: "#008080",
            padding: "15px",
            border: "2px solid white",
            borderRadius: "5px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "#00FFA3", fontSize: "18px", margin: "0" }}>
              Case Details :{" "}
            </h1>
            <svg
              style={{ cursor: "pointer" }}
              width="25"
              height="25"
              viewBox="0 0 10 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="3" stroke="white" fill="white" />
              <circle cx="5" cy="15" r="3" stroke="white" fill="white" />
              <circle cx="5" cy="25" r="3" stroke="white" fill="white" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              background: "#C5C5C5",
              color: "#008080",
              border: "2px solid white",
              borderRadius: "5px",
            }}
          >
            <h1 style={{ fontSize: "15px", margin: "0" }}>Time Remaining:</h1>
            <h1 style={{ fontSize: "15px", margin: "0" }}>00 : 00</h1>
          </div>
        </div>
        {/* bottom container */}
        <div
          style={{
            background: "#008080",
            padding: "15px",
            height: "350px",
            border: "2px solid white",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 20px",
              background: "#C5C5C5",
              color: "#008080",
              border: "2px solid white",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "15px", margin: "0" }}>
                AI Judge Preview{" "}
              </h1>
            </div>
            <div style={{ width: "15px", margin: "0" }}>
              <svg
                width="24"
                height="24"
                style={{ fill: "#008080", cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
              </svg>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 20px",
              background: "#C5C5C5",
              color: "#008080",
              border: "2px solid white",
              borderRadius: "5px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "15px", margin: "0" }}>
                Document Preview{" "}
              </h1>
            </div>
            <div style={{ width: "15px", margin: "0" }}>
              <svg
                width="24"
                height="24"
                style={{ fill: "#008080", cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
              </svg>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "40px 0px",
            }}
          >
            <img className={Styles.logoImage} src={logo} alt="logo" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="white"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                  fill-rule="nonzero"
                />
              </svg>
              <h1 style={{ fontSize: "15px", margin: "0" }}>New Case Input</h1>
            </div>
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z" />
              </svg>
              <h1 style={{ fontSize: "15px", margin: "0" }}>Claw Home</h1>
            </div>
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
              </svg>
              <h1 style={{ fontSize: "15px", margin: "0" }}>Exit Courtroom</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.rightContainer}>
        <div className={Styles.rightTopContainer}>
          <div
            style={{
              margin: "10px",
              background: "#161a25",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ fontSize: "15px", padding: "10px" }}>
              in publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available
            </h1>
          </div>
          <div
            style={{
              margin: "10px",
              background: "#161a25",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ fontSize: "15px", padding: "10px" }}>
              in publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available
            </h1>
          </div>
          <div
            style={{
              margin: "10px",
              background: "#161a25",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ fontSize: "15px", padding: "10px" }}>
              in publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available
            </h1>
          </div>
        </div>
        <div className={Styles.rightBottomContainer}>
          <input
            style={{
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              padding: "10px",
              width: "600px",
            }}
            placeholder="Input Your Case Into The Courtroom"
          />
          <div
            style={{
              display: "flex",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={fight}
              alt="fight"
            />
            <h2 style={{ fontSize: "15px", margin: "0" }}>Fight Yourself</h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={draft}
              alt="draft"
            />
            <h2 style={{ fontSize: "15px", margin: "0" }}>Get First Draft</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseAiForm;
