import React, { useState } from "react";
import logo from "../../assets/images/claw-login.png";
import Styles from "./AiSidebar.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const dialogText =
  "n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is availablen publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is availablen publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available";

const AiSidebar = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.removeItem("hasSeenSplash");


    localStorage.setItem("FileUploaded", false);

    navigate("/court-room");
  };
  const [editDialog, setEditDialog] = useState(false);
  const [text, setText] = useState(dialogText);
  return (
    <>
      <div className="flex flex-col gap-2 h-screen p-3">
        {/* top container */}
        <div className="bg-[#008080] p-4 border-2 border-white rounded h-full gap-5 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center ">
            <h1 className="text-[#00FFA3] text-[18px] m-0">Case Details : </h1>

            <motion.button
              whileTap={{ scale: "0.95" }}
              onClick={() => setEditDialog(true)}
              className="border border-[#00FFA3] rounded-lg p-1 px-2"
            >
              Edit
            </motion.button>
          </div>
          <div className="h-1/2"></div>
          <div className="flex justify-between items-center p-2 bg-[#C5C5C5] text-[#008080] border-2 border-white rounded">
            <h1 className="text-sm m-0">Time Remaining:</h1>
            <h1 className="text-sm m-0">00 : 00</h1>
          </div>
        </div>
        {/* bottom container */}
        <div className="bg-[#008080] p-4 h-full border-2 border-white rounded flex flex-col justify-between">
          <div>
            <motion.div
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
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
                cursor: "pointer",
              }}
            >
              <div>
                <h1 style={{ fontSize: "15px", margin: "0" }}>
                  Download Session History
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
            </motion.div>
            <motion.div
              whileTap={{ scale: "0.95" }}
              whileHover={{ scale: "1.01" }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 20px",
                background: "#C5C5C5",
                color: "#008080",
                border: "2px solid white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <div>
                <h1 style={{ fontSize: "15px", margin: "0" }}>
                  Download Case History
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
            </motion.div>
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
              gap: "15px",
              alignItems: "center",
            }}
          >
            <div className="flex flex-col gap-3">
              <Link to={"/courtroom-ai/upload"}>
                <motion.div
                  whileTap={{ scale: "0.95" }}
                  whileHover={{ scale: "1.01" }}
                  style={{
                    display: "flex",
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
                  <h1 style={{ fontSize: "15px", margin: "0", color: "white" }}>
                    New Case Input
                  </h1>
                </motion.div>
              </Link>
              <motion.div
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
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
              </motion.div>
              {/* //TODO : Add a handler and make sure to clear a local storage to setting splash screen to false on exiting courtroom*/}
              <motion.div
                whileTap={{ scale: "0.95" }}
                whileHover={{ scale: "1.01" }}
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

                <h1 style={{ fontSize: "15px", margin: "0" }}>
                  Exit Courtroom
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {editDialog ? (
        <div
          style={{
            width: "100%",
            height: "105%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right,#0e1118,#008080)",
              height: "450px",
              width: "900px",
              border: "2px solid white",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <svg
                onClick={() => setEditDialog(false)}
                style={{ margin: "20px", cursor: "pointer" }}
                width="30"
                height="30"
                fill="white"
                stroke="white"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
            <div
              style={{
                margin: "0px 30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1 style={{ margin: "0", fontSize: "20px" }}>
                Document Preview
              </h1>
              <textarea
                style={{
                  margin: "20px 0px",
                  height: "260px",
                  padding: "10px",
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={{ borderRadius: "10px" }}>Save</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AiSidebar;