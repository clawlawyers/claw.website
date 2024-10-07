import React, { useState, useEffect } from "react";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { CircularProgress } from "@mui/material";

const AudioPlayer = ({ text, token, setAnchorEl }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    // Fetch the audio file
    const fetchAudio = async () => {
      try {
        const response = await fetch(
          `${NODE_API_ENDPOINT}/gpt/api/read_aloud`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ input_text: text }),
          }
        );
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        setBuffer(audioBuffer);
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    };

    fetchAudio();

    // Clean up AudioContext
    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  const playAudio = () => {
    if (audioContext && buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      setSourceNode(source);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (sourceNode) {
      sourceNode.stop();
      setIsPlaying(false);
      setAnchorEl(false);
    }
  };

  return (
    <div>
      {!buffer ? (
        <div className="px-3">
          <CircularProgress size={15} color="inherit" />
        </div>
      ) : (
        <div className="flex items-center">
          {!isPlaying ? (
            <button
              className="bg-transparent p-0"
              onClick={playAudio}
              style={{ backgroundImage: "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M3 22v-20l18 10-18 10z" />
              </svg>
            </button>
          ) : (
            <button
              className="bg-transparent p-0"
              style={{ backgroundImage: "none" }}
              onClick={stopAudio}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
