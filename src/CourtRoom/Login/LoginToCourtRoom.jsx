import React, { useState } from "react";
import balances from "../../assets/images/BalanceScales.png";
import login from "../../assets/images/claw-login.png";
import Styles from "./LoginToCourtRoom.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LoginToCourtRoom() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const currentTime = new Date();
  return (
    <div>
      <div className={Styles.topcontainer}>
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={balances}
            alt="balance"
          />
        </div>
        <div style={{ marginRight: "140px" }}>
          <div
            style={{
              background: "linear-gradient(to bottom, #006E6E, #09FFFF)",
              padding: "40px",
              border: "3px solid white",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className={Styles.topContainerImage}
                src={login}
                alt="logo"
              />
              <h1 style={{ fontSize: "15px" }}>COURTROOM</h1>
            </div>
            <div style={{ margin: "20px 0px" }}>
              <h1 style={{ fontSize: "15px", marginTop: "25px" }}>
                Enter your Mobile Number and Password that you used to book your
                Courtroom
              </h1>
              <div className={Styles.phoneContainer}>
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24 11.06 11.06 0 003.47.56 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.06 11.06 0 00.56 3.47 1 1 0 01-.24 1.06l-2.2 2.2z" />
                </svg>
                <input type="text" placeholder="Enter your Phone Number" />
              </div>
              <div className={Styles.phoneContainer}>
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-key"
                >
                  <path d="M21 2l-6 6M15 8l2 2m-3-3l-1.5 1.5M12 11a5 5 0 1 1-7 7 5 5 0 0 1 7-7z" />
                  <circle cx="14" cy="14" r="1" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                />
                {showPass ? (
                  <svg
                    onClick={() => setShowPass(false)}
                    style={{
                      position: "absolute",
                      left: "400px",
                      cursor: "pointer",
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 4.5C7.305 4.5 3.19 7.527 1.062 12c2.128 4.473 6.243 7.5 10.938 7.5 4.695 0 8.81-3.027 10.938-7.5C20.81 7.527 16.695 4.5 12 4.5zm0 12.5c-3.315 0-6-2.686-6-6s2.685-6 6-6 6 2.686 6 6-2.685 6-6 6zm0-10a4 4 0 0 0 0 8 4 4 0 0 0 0-8z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPass(true)}
                    style={{
                      position: "absolute",
                      left: "400px",
                      cursor: "pointer",
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 4.5C7.305 4.5 3.19 7.527 1.062 12c.86 1.81 2.052 3.44 3.513 4.735L1 20.312l1.688 1.687L5.73 19.343c1.418.84 3.004 1.364 4.77 1.394l-.073-.074C16.76 19.523 20.81 16.497 22.938 12 20.81 7.527 16.695 4.5 12 4.5zM12 6c.93 0 1.82.176 2.65.482L6.482 14.65C6.176 13.82 6 12.93 6 12c0-3.314 2.686-6 6-6zm6 2c1.31 0 2.52.295 3.59.812L14.813 15.59C14.295 14.52 14 13.31 14 12c0-3.314 2.686-6 6-6z" />
                  </svg>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", fontSize: "5px" }}>
                  <h1 style={{ fontSize: "20px" }}>Current Time:</h1>
                  <h1 style={{ fontSize: "20px" }}>
                    {currentTime.getHours()}:{currentTime.getMinutes()}:
                    {currentTime.getSeconds()}
                  </h1>
                </div>
                <Link to={"/court-room/courtroom-ai"}>
                  <motion.button
                    whileTap={{ scale: "0.95" }}
                    style={{
                      background: "none",
                      border: "2px solid white",
                      borderRadius: "5px",
                    }}
                  >
                    Enter Courtroom Now
                  </motion.button>
                </Link>
              </div>
              <hr
                style={{
                  height: "0px",
                  border: "none",
                  borderTop: "5px solid white",
                }}
              />
              <h1 style={{ fontSize: "15px" }}>
                By signing up,you agree to our Terms of Service & Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", placeItems: "center", marginTop: "80px" }}>
        <motion.div
          className={Styles.third}
          style={{
            width: "75%",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={{
              hover: { x: "100%" },
            }}
            initial={{ x: "0%" }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #00ffa3, #008080)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              <h1
                style={{
                  color: "#008080",
                  fontWeight: 800,
                  textWrap: "wrap",
                }}
              >
                Experience the AI Courtroom
              </h1>
            </div>
            <button
              style={{
                backgroundColor: isHovered ? "white" : "#008080",
                color: isHovered ? "#008080" : "white",
                margin: "15px",
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                fontSize: 27,
              }}
            >
              Contact us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginToCourtRoom;
