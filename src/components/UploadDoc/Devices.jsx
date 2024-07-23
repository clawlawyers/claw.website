import React, { useState } from "react";
import Drive from "../../assets/icons/drive.svg";
import DropBox from "../../assets/icons/dropbox.svg";
import pc from "../../assets/icons/local.svg";
import styles from "../../CourtRoom/CourtroomAi/UploadDoc.module.css";
import Dialog from "../ui/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import upload from "../../assets/icons/Animation - 1721365056046.json";
import { useNavigate } from "react-router-dom";
import analyze from "../../assets/icons/Animation - 1721467138603.json";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setOverview } from "../../features/bookCourtRoom/LoginReducreSlice";

const Devices = ({ uploadedFile, setUploadedFile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [closed, setClosed] = useState(false);
  const [files, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  // console.log(inputText);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: upload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const analyzeLottie = {
    loop: true,
    autoplay: true,
    animationData: analyze,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleSave = () => {
    // text save logic
    dispatch(setOverview(inputText));
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

  const handleUploadFromComputer = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.jpg"; // Specify the accepted file types
    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      setFile(file);
      if (file) {
        setUploading(true);

        console.log(file);

        setTimeout(() => {
          console.log("File uploaded successfully");
          setUploadedFile(true);
          localStorage.setItem("FileUploaded", true);

          // Mock the file URL
          const mockFileUrl = "https://example.com/uploaded-file-url";

          setUploading(false);
          setAnalyzing(true);

          setTimeout(() => {
            setAnalyzing(false);
            setUploadComplete(true);

            const mockCaseOverview =
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, est non blandit luctus, orci justo bibendum urna, at gravida ligula eros eget lectus.";

            console.log(mockCaseOverview);
            setPreviewContent(mockCaseOverview);
            setInputText(mockCaseOverview);
            //dispatch function
            dispatch(setOverview(mockCaseOverview));
          }, 3000); // Simulate analyzing
        }, 3000); // Simulate upload
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

        //dispatch function
        // dispatch(setOverview())
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

        //dispatch function
        // dispatch(setOverview())
      }, 3000); // Simulate analyzing
    }, 3000); // Simulate upload
  };

  const handleDialogClose = () => {
    setUploading(false);
    setAnalyzing(false);
    setUploadComplete(false);
    setPreviewContent("");
    navigate("/courtroom-ai/arguments");
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
          <img className="p-5" src={Drive} alt="" />
          <h4 className="font-semibold text-neutral-500">Upload from Drive</h4>
        </div>
        <div className={styles.verticalLine}></div>
        <div
          className={`${styles.images} gap-10 `}
          onClick={() => handleClick("drive")}
        >
          <img className="p-5" src={DropBox} alt="" />
          <h4 className="font-semibold text-neutral-500">
            Upload from Drop Box
          </h4>
        </div>
        <div className={styles.verticalLine}></div>
        <div
          className={`${styles.images} gap-10 `}
          onClick={() => handleClick("local")}
        >
          <img className="p-5" src={pc} alt="" />
          <h4 className="font-semibold text-neutral-500">
            Upload from your PC
          </h4>
        </div>
      </section>
      <Dialog
        open={uploading || analyzing || uploadComplete}
        onClose={handleDialogClose}
        title={
          uploading
            ? "Uploading Your Document"
            : analyzing
            ? "Analyzing the Document"
            : uploadComplete
            ? "Upload Complete"
            : ""
        }
        text={uploading || analyzing ? "" : previewContent}
        inputText={inputText}
        setInputText={setInputText}
        buttonText={`${uploadComplete ? "Save" : ""}`}
        onButtonClick={handleSave}
        lottieOptions={
          uploading ? defaultOptions : analyzing ? analyzeLottie : ""
        }
      >
        {uploading && (
          <Lottie options={defaultOptions} height={250} width={250} />
        )}
        {analyzing && (
          <Lottie options={analyzeLottie} height={250} width={250} />
        )}
      </Dialog>
    </motion.div>
  );
};

export default Devices;
