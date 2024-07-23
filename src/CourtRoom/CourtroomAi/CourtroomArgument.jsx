import React, { useState } from "react";
import aiJudge from "../../assets/images/aiJudge.png";
import aiLawyer from "../../assets/images/aiLawyer.png";
import userIcon from "../../assets/images/userArgument.png";
import Styles from "./CourtroomArgument.module.css";
import { motion } from "framer-motion";
import loader from "../../assets/images/argumentLoading.gif";

const userArgumentsArr = [
  "I feel your pain. This is such a simple function and yet they make it so amazingly complicated. I find the same nonsense with adding a simple border to an object. They have 400 ways to shade the color of a box, but not even 1 simple option for drawing a line around the box. I get the feeling the Figma designers don’t ever use their product",
  "I get the feeling the Figma designers don’t ever use their product",
  "I find the same nonsense with adding a simple border to an object. They have 400 ways to shade the color of a box, but not even 1 simple option for drawing a line around the box. I get the feeling the Figma designers don’t ever use their product",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
  "This is such a simple function and yet they make it so amazingly complicated.",
];

const aiLawyerArr = [
  "This is such a simple function and yet they make it so amazingly complicated.",
];

const CourtroomArgument = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [lawyerArgument, setLawyerArgument] = useState(aiLawyerArr[0]);
  const [selectedUserArgument, setSelectedUserArgument] = useState(null);
  const [selectedUserArgumentContent, setSelectedUserArgumentContent] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(userArgumentsArr[index]);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = (index) => {
    const updatedArguments = [...userArgumentsArr];
    updatedArguments[index] = editValue;
    setEditIndex(null);
    setEditValue("");
  };

  const handleSwap = () => {
    if (selectedUserArgument !== null) {
      setLawyerArgument(selectedUserArgumentContent);
    } else {
      const swapArgument = userArgumentsArr[userArgumentsArr.length - 1];
      setLawyerArgument(swapArgument);
    }
    setSelectedUserArgument(null);
    setSelectedUserArgumentContent(null);
  };

  const handleArgumentSelect = (index, x) => {
    setSelectedUserArgument(index);
    setSelectedUserArgumentContent(x);
    // api call here
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {/* top container */}
        <div className="grid grid-cols-2">
          {/* topContainer */}
          {/* <div className="grid grid-cols-2 p-2"> */}
          {/* top left Cont */}
          {loading ? (
            <div
              className="bg-[#033E40] h-[300px]"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              <img alt="laoding" src={loader} className="w-28 h-28" />
            </div>
          ) : (
            <div
              className="bg-[#033E40] h-[300px]"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              <div
                className=""
                style={{ padding: "10px", display: "flex", gap: "10px" }}
              >
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={aiJudge}
                  alt="judge-icon"
                />
                <h1 style={{ fontSize: "20px", margin: "0" }}>AI Judge</h1>
              </div>
              <div
                className="h-full"
                style={{
                  margin: "15px",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <h1 style={{ fontSize: "15px" }}>
                  AGREEEMNT 1 I feel your pain. This is such a simple function
                  and yet they make it so amazingly complicated. I find the same
                  nonsense with adding a simple border to an object. They have
                  400 ways to shade the color of a box, but not even 1 simple
                  option for drawing a line around the box AGREEEMNT 1 I feel
                  your pain. This is such a simple function and yet they make it
                  so amazingly complicated. I find the same nonsense with adding
                  a simple border to an object. They have 400 ways to shade the
                  color of a box, but not even 1 simple option for drawing a
                  line around the box AGREEEMNT 1 I feel your pain. This is such
                  a simple function and yet they make it so amazingly
                  complicated. I find the same nonsense with adding a simple
                  border to an object. They have 400 ways to shade the color of
                  a box, but not even 1 simple option for drawing a line around
                  the box AGREEEMNT 1 I feel your pain. This is such a simple
                  function and yet they make it so amazingly complicated. I find
                  the same nonsense with adding a simple border to an object.
                  They have 400 ways to shade the color of a box, but not even 1
                  simple option for drawing a line around the box
                </h1>
              </div>
            </div>
          )}
          {/* top right cont */}
          {loading ? (
            <div
              className="bg-[#033E40] h-[300px]"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              <img alt="laoding" src={loader} className="w-28 h-28" />
            </div>
          ) : (
            <div
              className="h-[300px]"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#033E40",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              <div
                className=""
                style={{ padding: "10px", display: "flex", gap: "10px" }}
              >
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={aiLawyer}
                  alt="judge-icon"
                />
                <h1 style={{ fontSize: "20px", margin: "0" }}>AI Lawyer</h1>
              </div>
              <div
                className="h-full"
                style={{
                  margin: "15px",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <h1 style={{ fontSize: "15px" }}>{lawyerArgument}</h1>
              </div>
              <motion.div
                className="py-2"
                onClick={handleSwap}
                whileTap={{ scale: "0.98" }}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  stroke="white"
                  fill="white"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z"
                    fill-rule="nonzero"
                  />
                </svg>
                <h1 style={{ margin: "5px", fontSize: "15px" }}>
                  Swap with AI Lawyer
                </h1>
              </motion.div>
            </div>
          )}
          {/* </div> */}
        </div>
        {/* mid container */}
        <div
          className="m-2 flex-1"
          style={{
            background: "#033E40",
            // margin: "0px 15px",
            borderRadius: "10px",

            //   overflow: "scroll",
          }}
        >
          <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
            <img
              style={{ width: "25px", height: "25px" }}
              src={userIcon}
              alt="user-icon"
            />
            <h1 style={{ fontSize: "20px", margin: "0" }}>User Argument</h1>
          </div>
          <div
            className="h-[300px]"
            style={{
              margin: "10px",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            {userArgumentsArr.map((x, index) => (
              <div
                onClick={() => {
                  handleArgumentSelect(index, x);
                }}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border:
                    selectedUserArgument === index
                      ? "1px solid #00ffa3"
                      : "1px solid white",
                  borderRadius: "10px",
                  padding: "5px",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                {editIndex === index ? (
                  <input
                    className="text-black"
                    style={{
                      margin: "0",
                      fontSize: "15px",
                      padding: "15px",
                      borderRadius: "10px",
                      width: "800px",
                    }}
                    value={editValue}
                    onChange={handleChange}
                  />
                ) : (
                  <h1
                    style={{ margin: "0", fontSize: "15px", padding: "15px" }}
                  >
                    {x}
                  </h1>
                )}
                {editIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    style={{ borderRadius: "10px", margin: "5px" }}
                  >
                    Save
                  </button>
                ) : (
                  <div>
                    <svg
                      onClick={() => editIndex !== index && handleEdit(index)}
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                      fill="white"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* bottom container */}
      <div className="">
        <div className="w-full py-2 px-3 grid grid-cols-[65%_35%]">
          <div className="py-2 pr-2">
            <input
              className="w-full text-black"
              style={{
                border: "2px solid #00ffa3",
                borderRadius: "20px",
                padding: "10px",
                // width: "600px",
                cursor: "pointer",
              }}
              placeholder="Input Your Case Into The Courtroom"
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
                cursor: "pointer",
                color: "white",
              }}
            >
              <h2 style={{ fontSize: "15px", margin: "0" }}>Add Argument</h2>
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
                cursor: "pointer",
                color: "white",
              }}
            >
              <h2 style={{ fontSize: "15px", margin: "0" }}>Reset Your Case</h2>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtroomArgument;
