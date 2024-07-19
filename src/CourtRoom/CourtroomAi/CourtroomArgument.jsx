import React, { useState } from "react";
import aiJudge from "../../assets/images/aiJudge.png";
import aiLawyer from "../../assets/images/aiLawyer.png";
import userIcon from "../../assets/images/userArgument.png";
import Styles from "./CourtroomArgument.module.css";

const argumentsArr = [
  "I feel your pain. This is such a simple function and yet they make it so amazingly complicated. I find the same nonsense with adding a simple border to an object. They have 400 ways to shade the color of a box, but not even 1 simple option for drawing a line around the box. I get the feeling the Figma designers don’t ever use their product",
  "I feel your pain. This is such a simple function and yet they make it so amazingly complicated. I find the same nonsense with adding a simple border to an object. They have 400 ways to shade the color of a box, but not even 1 simple option for drawing a line around the box. I get the feeling the Figma designers don’t ever use their product",
  "I feel your pain. This is such a simple function and yet they make it so amazingly complicated. I find the same nonsense with adding a simple border to an object. They have 400 ways to shade the color of a box, but not even 1 simple option for drawing a line around the box. I get the feeling the Figma designers don’t ever use their product",
];

const CourtroomArgument = () => {
  const [editIndex, setEditIndex] = useState(null); // State to track which div is being edited
  const [editValue, setEditValue] = useState(""); // State to track the current value of the edited input

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(argumentsArr[index]); // Set the input field's value to the current content
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = (index) => {
    const updatedArguments = [...argumentsArr];
    updatedArguments[index] = editValue;
    setEditIndex(null);
    setEditValue("");
  };
  return (
    <>
      <div className={Styles.topContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#0e1118",
            margin: "5px",
            borderRadius: "10px",
          }}
        >
          <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
            <img
              style={{ width: "25px", height: "25px" }}
              src={aiJudge}
              alt="judge-icon"
            />
            <h1 style={{ fontSize: "20px", margin: "0" }}>AI Judge</h1>
          </div>
          <div
            style={{
              height: "150px",
              margin: "15px",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <h1 style={{ fontSize: "15px" }}>
              AGREEEMNT 1 I feel your pain. This is such a simple function and
              yet they make it so amazingly complicated. I find the same
              nonsense with adding a simple border to an object. They have 400
              ways to shade the color of a box, but not even 1 simple option for
              drawing a line around the box.
            </h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#0e1118",
            margin: "5px",
            borderRadius: "10px",
          }}
        >
          <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
            <img
              style={{ width: "25px", height: "25px" }}
              src={aiLawyer}
              alt="judge-icon"
            />
            <h1 style={{ fontSize: "20px", margin: "0" }}>AI Lawyer</h1>
          </div>
          <div
            style={{
              height: "150px",
              margin: "15px",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <h1 style={{ fontSize: "15px" }}>
              AGREEEMNT 1 I feel your pain. This is such a simple function and
              yet they make it so amazingly complicated. I find the same
              nonsense with adding a simple border to an object. They have 400
              ways to shade the color of a box, but not even 1 simple option for
              drawing a line around the box. I get the feeling the Figma
              designers don’t ever use their product
            </h1>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#0e1118",
          margin: "0px 15px",
          borderRadius: "10px",
          //   overflow: "scroll",
        }}
      >
        <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
          <img
            style={{ width: "25px", height: "25px" }}
            src={userIcon}
            alt="judge-icon"
          />
          <h1 style={{ fontSize: "20px", margin: "0" }}>User Argument</h1>
        </div>
        <div
          style={{
            margin: "10px",
            height: "220px",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {argumentsArr.map((x, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid white",
                borderRadius: "10px",
                padding: "5px",
                margin: "5px",
              }}
            >
              {editIndex === index ? (
                <input
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
                <h1 style={{ margin: "0", fontSize: "15px", padding: "15px" }}>
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
                <svg
                  onClick={() => editIndex !== index && handleEdit(index)}
                  style={{ cursor: "pointer" }}
                  width="8%"
                  height="8%"
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
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.bottomContainer}>
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
            border: "2px solid #00ffa3",
            borderRadius: "20px",
            background: "#008080",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <h2 style={{ fontSize: "15px", margin: "0" }}>Add Argument</h2>
        </div>
        <div
          style={{
            border: "2px solid #00ffa3",
            borderRadius: "20px",
            background: "#008080",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <h2 style={{ fontSize: "15px", margin: "0" }}>Reset Your Case</h2>
        </div>
      </div>
    </>
  );
};

export default CourtroomArgument;
