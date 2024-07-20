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
import { useNavigate } from "react-router-dom";
import analyze from "../../assets/icons/Animation - 1721467138603.json"
const Devices = ({ uploadedFile, setUploadedFile }) => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [closed, setClosed] = useState(false);
  const [files, setFile] = useState(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: upload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const analyzeLottie = {
    loop:true,
    autoplay:true,
    animationData:analyze,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

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
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt"; // Specify the accepted file types
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setFile(file);
      if (file) {
        setUploading(true);

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
        setUploadedFile(true);
      }
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
    navigate("/courtroom-ai")
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
        <div
          className={`${styles.images} gap-10 `}
          onClick={() => handleClick("drive")}
        >
          <img src={Drive} alt="" />
          <h4 className="font-semibold text-neutral-500">Upload from Drive</h4>
        </div>
        <div className={styles.verticalLine}></div>
        <div
          className={`${styles.images} gap-10 `}
          onClick={() => handleClick("dropbox")}
        >
          <img src={DropBox} alt="" />
          <h4 className="font-semibold text-neutral-500">
            Upload from Drop Box
          </h4>
        </div>
        <div className={styles.verticalLine}></div>
        <div
          className={`${styles.images} gap-10 `}
          onClick={() => handleClick("local")}
        >
          <img src={pc} alt="" />
          <h4 className="font-semibold text-neutral-500">
            Upload from Computer{" "}
          </h4>
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
            <Lottie
              style={{
                color: "white",
              }}
              options={defaultOptions}
              height={150}
              width={150}
            />
          )}
          <DialogTitle>
            {uploading && (
              <div>
                {/* //TODO upload lottie */}
                <h4>Uploading Your Document</h4>
              </div>
            )}
            {analyzing && (
              <div>
                {/* //TODO upload complete lottie */}
                <Lottie
              style={{
                color: "white",
              }}
              options={analyzeLottie}
              height={150}
              width={150}
            />
                <h4>Analyzing thje document</h4>
              </div>
            )}
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
