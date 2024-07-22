import React, { useState } from "react";
import Styles from "./UploadDoc.module.css";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Devices from "../../components/UploadDoc/Devices";
import { motion } from "framer-motion";
import uploadImage from "../../assets/icons/upload.svg";
import { useNavigate } from "react-router-dom";
const UploadDoc = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputText(event.target.value);
    console.log(inputText);
  };
  const [ChooseDevice, setChooseDevice] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [error, setError] = useState(false);
  const handleClick = () => {
    setChooseDevice(true);
  };

  const handleSubmit = () => {
    if (!ChooseDevice && !inputText) {
      setError(true);
    } else {
      console.log(uploadedFile);
      navigate("/courtroom-ai");
    }
  };
  console.log(uploadedFile);
  const transition = { duration: 1 };
  const variants = {
    open: { height: "100%", width: "100%" },
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
          <Devices
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </motion.div>
      ) : (
        <div
          onClick={handleClick}
          className={`${Styles.uploadButton} ${
            error ? Styles.errorBoundary : ""
          }`}
        >
          <img src={uploadImage} alt="" />
        </div>
      )}

      <div className="w-full py-2 px-3 grid grid-cols-[65%_35%]">
        <div className="py-2 pr-2">
          <input
            className="w-full"
            style={{
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              padding: "10px",
              // width: "600px",
              cursor: `${!uploadedFile || !inputText === "" ? "not-allowed" : "pointer"}`,
            }}
            
            placeholder="Input Your Case Into The Courtroom"
            onChange={handleInputChange}
            value={inputText}
            
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            className="flex-1 my-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "not-allowed",
              color: "white",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={fight}
              alt="fight"
            />
            <h2 style={{ fontSize: "15px", margin: "0", color: "gray" }}>
              Fight Yourself
            </h2>
          </motion.button>
          <motion.button
            className="flex-1 my-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              background: "#008080",
              padding: "10px",
              cursor: "not-allowed",
              color: "white",
            }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              src={draft}
              alt="draft"
            />
            <h2 style={{ fontSize: "15px", margin: "0", color: "gray" }}>
              Get First Draft
            </h2>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default UploadDoc;
