import { Close } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatbotImg from "../assets/icons/Chatbot.png";
import loaderGif from "../assets/icons/Chatbot.gif";
import { Link } from "react-router-dom";

const Chatbot = ({ handleClose }) => {
  const [chatArr, setChatArr] = useState([{ isUser: true, message: "loader" }]);
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [chatArr]);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/chatBot/getUserId`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   id: userMongoId,
        //   location: area,
        // }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const setMessage = {
          isUser: false,
          message: "Hello,how may I help you?",
        };
        setUserId(data.data.user_id);
        setChatArr([setMessage]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      const newPrompt = [
        {
          isUser: true,
          message: query,
        },
        {
          isUser: false,
          message: "loader",
        },
      ];
      setChatArr((prevChar) => [...prevChar, ...newPrompt]);
      setQuery("");
      const response = await fetch(
        `${NODE_API_ENDPOINT}/chatBot/generateResponse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            message: query,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const setMessage = {
          isUser: false,
          message: data?.data?.reply
            .replaceAll("\\\\n\\\\n", "<br/>")
            .replaceAll("\\\\n", "<br/>")
            .replaceAll("\\n\\n", "<br/>")
            .replaceAll("\\n", "<br/>")
            .replaceAll("\n", "<br/>")
            .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
            .replaceAll("\\", "")
            .replaceAll('"', "")
            .replaceAll(":", " :")
            .replaceAll("#", ""),
        };
        setChatArr((prev) => {
          const updatedChatArr = [...prev];
          updatedChatArr.pop();
          updatedChatArr.push(setMessage);
          return updatedChatArr;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseChatbot = async () => {
    handleClose();
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/chatBot/end-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-[#1D2330] text-white p-2  rounded-lg">
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex gap-1 items-center">
          <img className="w-8" src={ChatbotImg} />
          <p className="m-0 text-white text-xl font-semibold">Claw Chatbot</p>
        </div>
        <Close className="cursor-pointer" onClick={handleCloseChatbot} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto">
        {chatArr.map((x, index) => (
          <div key={index}>
            {x.message === "loader" ? (
              <div className="w-full flex justify-start">
                <div className="w-fit flex justify-start">
                  <p className=" bg-white text-sm text-black rounded-t-xl rounded-r-xl">
                    <img src={loaderGif} />
                  </p>
                </div>
              </div>
            ) : (
              <>
                {x.isUser ? (
                  <div className="w-full flex justify-end">
                    <div className="w-5/6 flex justify-end">
                      <p className=" bg-[#005F62] p-2 text-sm text-white rounded-t-xl rounded-l-xl">
                        {x.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-start">
                    <div className="w-5/6 flex justify-start">
                      <p
                        dangerouslySetInnerHTML={{ __html: x.message }}
                        className=" bg-white p-2 text-sm text-black rounded-t-xl rounded-r-xl"></p>
                    </div>
                  </div>
                )}
                {/* Add "Contact Us" button after specific conditions */}
                {!x.isUser &&
                  index === chatArr.length - 1 &&
                  chatArr.filter((msg) => !msg.isUser).length > 1 && ( // Ensure at least 2 AI responses
                    <div className=" w-full flex justify-start mt-4">
                      <button className="px-4 py-2 bg-[#018081] text-white rounded-md hover:bg-[#016969] transition">
                        Contact Us
                      </button>
                    </div>
                  )}
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleQuerySubmit} className="flex items-center gap-2">
        <input
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-black focus:outline-none p-1 rounded-lg"
          placeholder="Enter your query..."
        />
        <button
          disabled={query === ""}
          className="bg-transparent p-0"
          type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
