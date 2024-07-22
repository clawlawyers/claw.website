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

<div className={`${Styles.rightBottomContainer} px-2 `}>
  <input
    className="border-2 border-[#00ffa3] text-neutral-900 rounded-xl p-2.5 w-full"
    placeholder="Input Your Case Into The Courtroom"
    value={inputText}
    onChange={handleInputChange}
  />
  <motion.button
    whileTap={{ scale: 0.98 }}
    whileHover={{ scale: 1.01 }}
    className={`flex items-center gap-1.5 border-2 border-[#00ffa3] rounded-md bg-[#008080] py-2 h-12  cursor-${
      !uploadedFile && inputText === "" ? "not-allowed" : "pointer"
    } ${!uploadedFile && inputText === "" ? "opacity-50" : "opacity-100"} w-1/6`}
    onClick={handleSubmit}
  >
    <img className="w-5 h-5" src={fight} alt="fight" />
    <h2 className="text-sm m-0">Fight Yourself</h2>
  </motion.button>
  <motion.button
    whileTap={{ scale: 0.98 }}
    whileHover={{ scale: 1.01 }}
    className={`flex items-center gap-1.5 border-2 border-[#00ffa3] rounded-md bg-[#008080] py-2 h-12 cursor-${
      !uploadedFile || inputText === "" ? "not-allowed" : "pointer"
    } ${!uploadedFile || inputText === "" ? "opacity-50" : "opacity-100"} w-1/6`}
    onClick={handleSubmit}
  >
    <img className="w-5 h-5" src={draft} alt="draft" />
    <h2 className="text-sm m-0">Get First Draft</h2>
  </motion.button>
</div>

    </section>
  );
};

export default UploadDoc;
