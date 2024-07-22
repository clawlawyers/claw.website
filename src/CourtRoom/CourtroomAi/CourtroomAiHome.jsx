import React from "react";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Styles from "./CourtroomAiHome.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CourtroomAiHome = () => {
  const isUploaded = localStorage.getItem("FileUploaded") === "true";
  console.log(isUploaded);

  const buttonStyles = {
    display: "flex",
    gap: "5px",
    border: "2px solid #00ffa3",
    borderRadius: "20px",
    padding: "10px",
    color: "white",
    cursor: isUploaded ? "pointer" : "not-allowed",
    background: isUploaded ? "#00ffa3" : "#008080",
  };

  const inputStyles = {
    border: "2px solid #00ffa3",
    borderRadius: "20px",
    padding: "10px",
    width: "600px",
    cursor: isUploaded ? "text" : "not-allowed",
  };

  return (
    <div className="w-full h-full flex flex-col justify-end">
      <div className="flex md:flex-row flex-col ">
        <motion.div
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
          className="m-2.5 bg-[#161a25] rounded-lg"
        >
          <h1
            whileHover={{ scale: "1.01" }}
            className="text-sm p-4 text-center"
          >
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: isUploaded ? "0.98" : "1" }}
          className="m-2.5 bg-[#161a25] rounded-lg"
        >
          <h1 className="text-sm p-4 text-center">
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
          className="m-2.5 bg-[#161a25] rounded-lg"
        >
          <h1 className="text-sm p-4 text-center">
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
      </div>
      <div className="w-full py-2 flex md:flex-row flex-col justify-center gap-2  items-center">
        <input
          className="w-[400px] md:w-[600px]"
          style={{
            border: "2px solid #00ffa3",
            borderRadius: "20px",
            padding: "10px",
            // width: "600px",
            cursor: "not-allowed",
          }}
          disabled
          placeholder="Input Your Case Into The Courtroom"
        />
        <motion.div
          style={buttonStyles}
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={fight}
            alt="fight"
          />
          <h2 style={{ fontSize: "15px", margin: "0", color: isUploaded ? "black" : "gray" }}>
            Fight Yourself
          </h2>
        </motion.div>
        <motion.div
          style={buttonStyles}
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={draft}
            alt="draft"
          />
          <h2 style={{ fontSize: "15px", margin: "0", color: isUploaded ? "black" : "gray" }}>
            Get First Draft
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default CourtroomAiHome;
