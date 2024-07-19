import React from "react";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Styles from "./CourtroomAiHome.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CourtroomAiHome = () => {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.rightTopContainer}>
        <motion.div
          whileHover={{ scale: "0.98" }}
          style={{
            margin: "10px",
            background: "#161a25",
            borderRadius: "10px",
          }}
        >
          <h1
            whileHover={{ scale: "0.95" }}
            style={{ fontSize: "15px", padding: "15px", textAlign: "center" }}
          >
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: "0.98" }}
          style={{
            margin: "10px",
            background: "#161a25",
            borderRadius: "10px",
          }}
        >
          <h1
            style={{ fontSize: "15px", padding: "15px", textAlign: "center" }}
          >
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: "0.98" }}
          style={{
            margin: "10px",
            background: "#161a25",
            borderRadius: "10px",
          }}
        >
          <h1
            style={{ fontSize: "15px", padding: "15px", textAlign: "center" }}
          >
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
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
        <Link to={"/courtroom-ai/arguments"}>
          <motion.div
            whileTap={{ scale: "0.95" }}
            style={{
              display: "flex",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={fight}
              alt="fight"
            />
            <h2 style={{ fontSize: "15px", margin: "0" }}>Fight Yourself</h2>
          </motion.div>
        </Link>
        <Link to={"/courtroom-ai/upload"}>
          <motion.div
            whileTap={{ scale: "0.95" }}
            style={{
              display: "flex",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={draft}
              alt="draft"
            />
            <h2 style={{ fontSize: "15px", margin: "0" }}>Get First Draft</h2>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default CourtroomAiHome;
