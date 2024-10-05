import React, { useState } from "react";
import WelcomePointers from "./WelcomePointers";
import hammer from "../assets/images/hammer.png";
import headset from "../assets/images/headset.png";
import uploadIcon from "../assets/images/upload.png";
import CustomInputForm from "./components/CustomInputForm";
import mindIcon from "../assets/images/mind.png";
import { motion } from "framer-motion";
import Styles from "./Welcome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { generateResponse, setGpt } from "../features/gpt/gptSlice";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mui/material";
import AudioPlayer from "./components/AudioPlay1";

const prompArr = [
  "What is the historical context behind the creation of the Right to Information (RTI) Act, 2005? How has this law evolved over time, and what were the major milestones in its development?",
  "Can you provide a detailed summary of the Finance Act 2021? What are the key provisions included in this act, and how do they impact tax regulations and financial reporting?",
  "What is the process for calculating taxes for self-employed individuals? Include details on applicable tax rates, business expense deductions, and any special considerations for freelancers or sole proprietors.",
  "What steps should I follow to file a query regarding a specific legal incident to the Police Department? Include information on necessary forms, submission methods, and expected response times.",
  "Discuss the legal issues involved in a case of employee dismissal due to alleged misconduct in Bangalore. What are the relevant laws and regulations, and how do they address wrongful termination and employee rights?",
];

export default function Welcome({
  submitPrompt,
  keyword,
  primaryColor,
  textGradient,
}) {
  let containerStyles = { width: "97%" };
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [audioOpen, setAudioOpen] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;

  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onPromptSelect(selectedPrompt) {
    if (!selectedPrompt) return;
    // setIsLoading(true);

    if (currentUser) {
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: selectedPrompt, model: "legalGPT" }),
      });
      const { data } = await res.json();
      dispatch(setGpt({ prompt: selectedPrompt }));
      dispatch(generateResponse({ sessionId: data.id, model: "legalGPT" }));

      navigate(`session/${data.id}`);
    } else {
      const searchParams = new URLSearchParams({
        callbackUrl: "/gpt/legalGPT",
      }).toString();
      dispatch(setGpt({ prompt: selectedPrompt }));
      navigate(`/login?${searchParams}`);
    }
  }

  return (
    <div
      className="my-[20px] md:my-0"
      style={{
        overflow: "auto",
        backgroundColor: "transparent",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-transparent w-full h-[90%] flex flex-col">
        <div
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              fontSize: "48px",
              fontWeight: 700,
              color: "#E5E5E5",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                padding: 3,
                borderLeft: `4px solid ${primaryColor}`,
                background: `linear-gradient(to right, ${textGradient[0]}, ${textGradient[1]} 100%)`,
              }}
            >
              {keyword}GPT
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              paddingTop: 10,
              fontSize: 16,
              background: "inherit",
            }}
          >
            The power of AI for your {keyword} service
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <CustomInputForm
            containerStyles={containerStyles}
            primaryColor={primaryColor}
            onSubmit={submitPrompt}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 px-3 gap-4">
            <motion.div
              whileTap={{ scale: "0.95" }}
              className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-[#303030] text-center"
            >
              <div
                onClick={() => onPromptSelect(prompArr[0])}
                className="flex flex-col gap-2 items-center justify-center p-3"
              >
                <img className="h-8 w-8" src={mindIcon} />
                <p className="flex-1 m-0">
                  Request information about specific laws or acts.
                </p>
              </div>
              <div className="w-full pt-2 flex justify-end">
                <svg
                  onClick={(e) => {
                    handleClick1(e);
                    setAudioOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z" />
                </svg>
                <Popover
                  id={id1}
                  open={open1}
                  anchorEl={anchorEl1}
                  onClose={handleClose1}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <AudioPlayer
                    token={currentUser.jwt}
                    text="Request information about specific laws or acts."
                  />
                </Popover>
              </div>
            </motion.div>
            <motion.div
              whileTap={{ scale: "0.95" }}
              className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-[#303030] text-center"
            >
              <div
                onClick={() => onPromptSelect(prompArr[2])}
                className="flex flex-col gap-2 items-center justify-center p-3"
              >
                <img className="h-8 w-8" src={mindIcon} />
                <p className="flex-1 m-0">
                  Learn the process of calculating tax amounts, including
                  applicable rates and deductions.
                </p>
              </div>
              <div className="w-full pt-2 flex justify-end">
                <svg
                  onClick={(e) => {
                    handleClick2(e);
                    setAudioOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z" />
                </svg>
                <Popover
                  id={id2}
                  open={open2}
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <AudioPlayer
                    text="Learn the process of calculating tax amounts, including
                  applicable rates and deductions."
                  />
                </Popover>
              </div>
            </motion.div>
            <motion.div
              whileTap={{ scale: "0.95" }}
              className="cursor-pointer flex flex-col justify-between items-center p-2 rounded tracking-wide text-xs bg-[#303030] text-center"
            >
              <div
                onClick={() => onPromptSelect(prompArr[4])}
                className="flex flex-col gap-2 items-center justify-center p-3"
              >
                <img className="h-8 w-8" src={mindIcon} />
                <p className="flex-1 m-0">
                  Engage in a discussion regarding legal issues and relevant
                  laws associated with the incident.
                </p>
              </div>
              <div className="w-full pt-2 flex justify-end">
                <svg
                  onClick={(e) => {
                    handleClick3(e);
                    setAudioOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z" />
                </svg>
                <Popover
                  id={id3}
                  open={open3}
                  anchorEl={anchorEl3}
                  onClose={handleClose3}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <AudioPlayer
                    text="Engage in a discussion regarding legal issues and relevant
                  laws associated with the incident."
                  />
                </Popover>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
