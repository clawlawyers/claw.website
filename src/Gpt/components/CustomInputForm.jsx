import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Styles from "./CustomInputForm.module.css";
import { close, open } from "../../features/popup/popupSlice";
import { MenuItem, Modal, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";
import { activePlanFeatures } from "../../utils/checkActivePlanFeatures";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Close } from "@mui/icons-material";
import "./CustomInput.css";
import UploadIcon from "../../assets/icons/Upload.png";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";

const languageArr = [
  "English",
  "Hindi",
  "Bengali",
  "Punjabi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Odia",
  "Urdu",
  "Assamese",
  "Maithili",
  "Dogri",
  "Nepali",
  "Sindhi",
  "Sanskrit",
];

export default function CustomInputForm({
  onSubmit,
  isLoading = false,
  isError = false,
  containerStyles,
  primaryColor,
  selectedPrompt,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);

  const [activePlan, setActivePlan] = useState([]);
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fileDialog, setFileDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value.toLowerCase());
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedLanguage("");
    setUploadedFiles([]);
    setFileDialog(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "legalGptAccess"));
    }
  }, [plan]);

  const handlePopupOpen = useCallback(() => {
    dispatch(open());
  }, []);
  const handlePopupClose = useCallback(() => dispatch(close()), []);

  function onFormSubmission(e) {
    e.preventDefault();
    if (activePlan[0]?.plan?.legalGptAccess) {
      e.query = query;
      setQuery("");
      onSubmit(e);
      return;
    } else {
      handlePopupOpen();
    }
  }

  useEffect(() => {
    if (selectedPrompt) {
      setQuery(selectedPrompt);
    }
  }, [selectedPrompt]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      handleFileSubmit();
    }
  }, [uploadedFiles]);

  const handleFileSubmit = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append(`file${index === 0 ? "" : index}`, file);
    });
    formData.append("language", selectedLanguage);
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/gpt/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={Styles.container} style={containerStyles}>
      <form
        onSubmit={onFormSubmission}
        // onSubmit={onFormSubmission}
        style={{
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255,255,255,0.05)",
          padding: 5,
          display: "flex",
        }}
      >
        <input
          type="text"
          disabled={isLoading || isError}
          placeholder="Type Your Legal Queries..."
          style={{
            flex: 1,
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
          }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        {/* <button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          disabled={isLoading || isError}
          style={{
            border: "none",
            backgroundColor: primaryColor,
            borderRadius: 10,
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          <FileUploadIcon
            style={{ color: "white", backgroundColor: "transparent" }}
          />
        </button> */}
        <Popover
          className="w-full"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {!fileDialog ? (
            <div className="p-3 bg-[#C2FFFF] w-full border-4 border-[#018081]">
              <div className="flex w-full justify-between items-center gap-28">
                <p className="m-0 text-[#018081] text-lg font-semibold">
                  Select Document Language
                </p>
                <Close
                  sx={{ color: "#018081" }}
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div>
                <TextField
                  label="Choose a Language"
                  select
                  fullWidth
                  margin="normal"
                  size="small"
                  value={selectedLanguage}
                  onChange={handleChange}
                >
                  {languageArr.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="w-full flex justify-end">
                <button
                  disabled={selectedLanguage === ""}
                  onClick={() => setFileDialog(true)}
                  className="rounded-lg"
                  style={{
                    background: "linear-gradient(90deg,#018081,#001B1B)",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#C2FFFF] w-full border-4 border-[#018081]">
              <div className="flex w-full justify-between items-center gap-28 pb-2">
                <p className="m-0 text-[#018081] text-lg font-semibold">
                  Upload Document
                </p>
                <Close
                  sx={{ color: "#018081" }}
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  multiple
                  accept=".docx, .pdf,.txt"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <div className="flex w-full justify-center pb-2">
                    <img className="rounded-none" src={UploadIcon} />
                  </div>
                  <span className="text-[#018081]">
                    Click Here to Choose a File to Upload
                  </span>
                </label>
              </div>
              {/* <div className="w-full flex justify-end pt-2">
                <button
                  disabled={selectedLanguage === ""}
                  onClick={handleFileSubmit}
                  className="rounded-lg"
                  style={{
                    background: "linear-gradient(90deg,#018081,#001B1B)",
                  }}
                >
                  Continue
                </button>
              </div> */}
            </div>
          )}
        </Popover>
        <button
          disabled={isLoading || isError || query === ""}
          type="submit"
          style={{
            border: "none",
            backgroundColor: primaryColor,
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
          }}
        >
          <SendIcon
            style={{ color: "white", backgroundColor: "transparent" }}
          />
        </button>
      </form>
    </div>
  );
}
