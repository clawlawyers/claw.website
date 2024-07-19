import React, { useState } from "react";
import Drive from "../../assets/icons/drive.svg";
import DropBox from "../../assets/icons/dropbox.svg";
import pc from "../../assets/icons/local.svg";
import styles from "../../CourtRoom/CourtroomAi/UploadDoc.module.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import upload from "../../assets/icons/Animation - 1721365056046.json";

const Devices = () => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: upload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClick = (source) => {
    switch (source) {
      case "local":
        handleUploadFromComputer();
        break;
      case "drive":
        handleUploadFromDrive();
        break;
      case "dropbox":
        handleUploadFromDropBox();
        break;
      default:
        break;
    }
  };

  const handleUploadFromComputer = () => {
    setUploading(true);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt"; // Specify the accepted file types
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      // Handle the file upload here
      setTimeout(() => {
        setUploading(false);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setUploadComplete(true);
          setPreviewContent(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, est non blandit luctus, orci justo bibendum urna, at gravida ligula eros eget lectus."
          ); // Set preview content
        }, 3000); // Simulate analyzing
      }, 3000); // Simulate upload
    });
    fileInput.click();
  };

  const handleUploadFromDrive = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setUploadComplete(true);
        setPreviewContent(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, est non blandit luctus, orci justo bibendum urna, at gravida ligula eros eget lectus."
        ); // Set preview content
      }, 3000); // Simulate analyzing
    }, 3000); // Simulate upload
  };

  const handleUploadFromDropBox = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setUploadComplete(true);
        setPreviewContent(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, est non blandit luctus, orci justo bibendum urna, at gravida ligula eros eget lectus."
        ); // Set preview content
      }, 3000); // Simulate analyzing
    }, 3000); // Simulate upload
  };

  const handleDialogClose = () => {
    setUploading(false);
    setAnalyzing(false);
    setUploadComplete(false);
    setPreviewContent("");
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // height: "100%",
        margin: "10px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className={styles.images} onClick={() => handleClick("drive")}>
          <img src={Drive} alt="" />
          <p>Upload from Drive</p>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.images} onClick={() => handleClick("dropbox")}>
          <img src={DropBox} alt="" />
          <p>Upload from Drop Box</p>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.images} onClick={() => handleClick("local")}>
          <img src={pc} alt="" />
          <p>Upload from Computer</p>
        </div>
      </section>
      <Dialog
        open={uploading || analyzing || uploadComplete}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: "#005f73",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            color: "white",
            width: "100%",
            height: "50%",
            border: "1px solid white",
          },
        }}
      >
        <IconButton
          style={{ position: "absolute", top: 10, right: 10, color: "white" }}
          onClick={handleDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {uploading && (
            <Lottie options={defaultOptions} height={150} width={150} />
          )}
          <DialogTitle>
            {uploading && "Uploading Your Document"}
            {analyzing && "Analyzing Your Document"}
            {uploadComplete && "Upload Complete"}
          </DialogTitle>
          {!uploading && !analyzing && uploadComplete && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <h4>Document Preview:</h4>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                    }}
                  >
                    {previewContent}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Devices;
