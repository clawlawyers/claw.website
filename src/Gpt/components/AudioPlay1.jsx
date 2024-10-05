import React, { useState, useEffect } from "react";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { CircularProgress } from "@mui/material";

const AudioPlayer = ({ text, token }) => {
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
    }
  };

  return (
    <div>
      {!buffer ? (
        <div className="px-3">
          <CircularProgress size={15} />
        </div>
      ) : (
        <div className="flex items-center gap-3 px-2 py-1 bg-[#303030] border">
          <button
            className="bg-transparent p-0"
            onClick={playAudio}
            disabled={isPlaying}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          </button>
          <button
            className="bg-transparent p-0"
            onClick={stopAudio}
            disabled={!isPlaying}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
