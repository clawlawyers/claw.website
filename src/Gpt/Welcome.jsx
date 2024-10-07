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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
