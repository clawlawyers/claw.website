import React, { useEffect, useState } from "react";
import fight from "../../assets/images/fightYourself.png";
import draft from "../../assets/images/draft.png";
import Styles from "./CourtroomAiHome.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const CourtroomAiHome = () => {
  const caseOverView = useSelector((state) => state.user.caseOverview);
  const isUploaded = localStorage.getItem("FileUploaded") === "true";
  console.log(isUploaded);

  const [overviewText, setOverViewText] = useState(null);

  useEffect(() => {
    if (caseOverView === "") return;
    setOverViewText(caseOverView);
  }, [caseOverView]);

  const buttonStyles = {
    display: "flex",
    gap: "5px",
    border: "2px solid #00ffa3",
    borderRadius: "20px",
    padding: "10px",
    color: "white",
    cursor: isUploaded ? "pointer" : "not-allowed",
    background: isUploaded ? "#00ffa3" : "#008080",
  };

  const inputStyles = {
    border: "2px solid #00ffa3",
    borderRadius: "20px",
    padding: "10px",
    width: "600px",
    cursor: isUploaded ? "text" : "not-allowed",
  };

  return (
    <div className="w-full h-full flex flex-col justify-end">
      <div className="flex md:flex-row flex-col px-2">
        <motion.div
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
          className="m-2.5 bg-[#033E40] rounded-lg"
        >
          <h1
            whileHover={{ scale: "1.01" }}
            className="text-sm p-4 text-center"
          >
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: isUploaded ? "0.98" : "1" }}
          className="m-2.5 bg-[#033E40] rounded-lg"
        >
          <h1 className="text-sm p-4 text-center">
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
        <motion.div
          whileHover={{ scale: isUploaded ? "1.01" : "1" }}
          className="m-2.5 bg-[#033E40] rounded-lg"
        >
          <h1 className="text-sm p-4 text-center">
            in publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </h1>
        </motion.div>
      </div>
      <div className="w-full px-3 grid grid-cols-[65%_35%] items-center">
        <div className="py-2 pr-2">
          <input
            className="w-full"
            style={{
              border: "2px solid #00ffa3",
              borderRadius: "20px",
              padding: "10px",
              // width: "600px",
              cursor: overviewText !== null ? "pointer" : "not-allowed",
              color: "black",
            }}
            disabled={overviewText === null}
            placeholder="Input Your Case Into The Courtroom"
          />
        </div>
        <div className="flex">
          <Link className="flex-1 flex justify-center items-center gap-1 my-2 p-[10px]">
            <motion.button
              whileTap={{ scale: "0.95" }}
              className="flex-1 my-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                border: "2px solid #00ffa3",
                borderRadius: "20px",
                background: "#008080",
                padding: "10px",
                cursor: overviewText !== null ? "pointer" : "not-allowed",
                color: "white",
              }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={fight}
                alt="fight"
              />
              <h2
                style={{
                  fontSize: "15px",
                  margin: "0",
                  color: overviewText === null ? "gray" : "white",
                }}
              >
                Fight Yourself
              </h2>
            </motion.button>
          </Link>
          <Link
            className="flex-1 flex justify-center items-center gap-1 my-2 p-[10px]"
            to={"/courtroom-ai/arguments"}
          >
            <motion.button
              whileTap={{ scale: "0.95" }}
              className="flex-1 my-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                border: "2px solid #00ffa3",
                borderRadius: "20px",
                background: "#008080",
                padding: "10px",
                cursor: overviewText !== null ? "pointer" : "not-allowed",
                color: "white",
              }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src={draft}
                alt="draft"
              />
              <h2
                style={{
                  fontSize: "15px",
                  margin: "0",
                  color: overviewText === null ? "gray" : "white",
                }}
              >
                Get First Draft
              </h2>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourtroomAiHome;
