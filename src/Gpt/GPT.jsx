import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import Welcome from "./Welcome";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useAuthState } from "../hooks/useAuthState";
import { gptUserCreated } from "../features/auth/authSlice";
import { generateResponse, setGpt } from "../features/gpt/gptSlice";
import toast from "react-hot-toast";

function GPT({
  keyword,
  model,
  primaryColor,
  textGradient,
  backgroundGradient,
}) {
  const [isLoading, setIsLoading] = useState();

  const currentUser = useSelector((state) => state.auth.user);
  const { isAuthLoading } = useAuthState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSuggestedQuestion = async () => {
    try {
      if (currentUser) {
        setIsLoading(true);
        const res = await fetch(
          `${NODE_API_ENDPOINT}/gpt/suggested-questions`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${currentUser.jwt}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ context: "uhiekd" }),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch suggested questions");
        }

        const data = await res.json();
        return data.question;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser, isAuthLoading]);

  async function submitPrompt({ query }) {
    if (currentUser) {
      setIsLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query, model }),
      });
      const { data } = await res.json();
      dispatch(setGpt({ prompt: query }));
      dispatch(generateResponse({ sessionId: data.id, model }));
      navigate(`session/${data.id}`);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: 894,
          width: 886,
          bottom: "-750px",
          marginLeft: "calc(50% - 443px)",
          background: `radial-gradient(circle, ${backgroundGradient[0]} 0%, ${backgroundGradient[1]} 5%)`,
          boxShadow: `0 0 100px 100px ${backgroundGradient[1]}`,
          borderRadius: 500,
        }}
      />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress style={{ color: "white" }} />
        </div>
      ) : (
        <Welcome
          keyword={keyword}
          textGradient={textGradient}
          primaryColor={primaryColor}
          submitPrompt={submitPrompt}
        />
      )}
    </div>
  );
}

export default GPT;
