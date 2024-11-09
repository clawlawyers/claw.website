import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import {
  setNewPromptData,
  setPromptLoading,
  setPromptsArr,
} from "../../features/gpt/promptSlice";
import { CircularProgress } from "@mui/material";

const WebSocketComponent = () => {
  const [message, setMessage] = useState("");
  // console.log(message);
  const [socket, setSocket] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 100;
  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");

  const currentUser = useSelector((state) => state.auth.user);
  const promptsArr = useSelector((state) => state?.prompt?.prompts);
  console.log(promptsArr);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = new WebSocket(
      "ws://20.198.24.104:8000/api/v1/gpt/generate"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      toast.success("WebSocket connection established successfully");
    };

    newSocket.onmessage = (event) => {
      const formattedData = event.data
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "");
      setMessage((prevMessages) => [...prevMessages, formattedData]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
      toast.error("WebSocket connection is closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      dispatch(setPromptLoading());
    }
  };

  async function getSessionId(message) {
    if (currentUser) {
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message.prompt, model: "legalGPT" }),
      });
      const { data } = await res.json();
      console.log(data);
      setSessionId(data.id);
      dispatch(
        setPromptsArr([
          ...promptsArr,
          {
            text: inputText,
            isDocument: null,
            contextId: null,
            isUser: true,
            sessionId: data.id,
          },
          {
            text: null,
            isDocument: null,
            contextId: null,
            isUser: false,
            sessionId: data.id,
          },
        ])
      );
      setUserGptResponse({
        text: inputText,
        isDocument: null,
        contextId: null,
        isUser: true,
        sessionId: data.id,
      });

      // navigate(`v1/${data.id}`);
      // navigate("/newSocket");
      // dispatch(setGpt({ prompt: query }));
      // dispatch(generateResponse({ sessionId: data.id, model }));
      // navigate(`session/${data.id}`);
    }
  }

  async function setUserGptResponse(message) {
    if (currentUser) {
      const res = await fetch(
        `${NODE_API_ENDPOINT}/gpt/session/appendMessage`,
        {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  useEffect(() => {
    if (message.length === 0) return;

    // Function to simulate typing effect
    const typeText = () => {
      if (index < message.length) {
        // Add the next character to the displayed text
        setDisplayedText((prev) => prev + message[index]);
        dispatch(setNewPromptData({ message: message[index] }));
        setIndex((prev) => prev + 1); // Increment the index
      }
    };

    // Start the typing effect if there's something to type
    if (index < message.length) {
      const animationFrameId = requestAnimationFrame(typeText); // Call typeText on next available frame
      return () => cancelAnimationFrame(animationFrameId); // Clean up if effect is interrupted
    }
  }, [index, message]);

  return (
    <div className="h-screen">
      <h1>WebSocket Messages</h1>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: displayedText,
        }}
      ></div> */}
      <input
        className="text-black"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={() => {
          sendMessage({
            prompt: inputText,
            context: "",
          });
          // setUserGptResponse({
          //   text: inputText,
          //   isDocument: null,
          //   contextId: null,
          //   isUser: true,
          //   sessionId,
          // })
          getSessionId({
            prompt: inputText,
          });
        }}
      >
        Send Message
      </button>
      <br />
      <br />
      <div>
        {promptsArr.map((x, index) => (
          <p key={index}>{x.text ? x.text : <CircularProgress />}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
