import React, { useState } from "react";
import Styles from "./UploadDoc.module.css";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Devices from "../../components/UploadDoc/Devices";
import { motion } from "framer-motion";
import uploadImage from "../../assets/icons/upload.svg"
const UploadDoc = () => {
  const [ChooseDevice, setChooseDevice] = useState(false);
  const [error, setError] = useState(false);
  const handleClick = () => {
    setChooseDevice(true);
  };
  const errorClick = () => {
    if(!ChooseDevice)
      {
        setError(true);
      }

  }

  const transition = { duration: 1 };
  const variants = {
    open: { height: "100%",width:"100%" },
    closed: { height: "40%", width: "70%" },
  };

  return (
    <section className={Styles.topContainer}>
      {ChooseDevice ? (
        <motion.div
          className={Styles.device}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={transition}
        >
          <Devices />
        </motion.div>
      ) : (
        <div
        onClick={handleClick}
        className={`${Styles.uploadButton} ${error ? Styles.errorBoundary : ""}`}
        
      >
        <img src={uploadImage} alt="" />
      </div>
      )}

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
          onClick={errorClick}
          
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={draft}
            alt="draft"
          />
          <h2 style={{ fontSize: "15px", margin: "0" }}>Get First Draft</h2>
        </div>
      </div>
    </section>
  );
};

export default UploadDoc;
