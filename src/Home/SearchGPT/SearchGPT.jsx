import React, { useState, useEffect } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import Styles from "./SearchGPT.module.css";
import globalStyles from "../../App.css";
import {
  generateResponse,
  setGpt,
  setPlan,
  setToken,
} from "../../features/gpt/gptSlice";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export default function SearchGPT() {
  const [query, setQuery] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.gpt);

  useEffect(() => {
    async function fetchGptUser() {
      try {
        const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
        });
        const parsed = await res.json();

        dispatch(setPlan({ plan: parsed.data.plan }));
        dispatch(setToken({ token: parsed.data.token }));
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUser) fetchGptUser();
  }, [currentUser, dispatch]);

  async function onSubmitPrompt() {
    if (!query) return;
    setIsLoading(true);

    if (currentUser) {
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query, model: "legalGPT" }),
      });
      const { data } = await res.json();
      dispatch(setGpt({ prompt: query }));
      dispatch(generateResponse({ sessionId: data.id, model: "legalGPT" }));

      navigate(`gpt/legalGPT/session/${data.id}`);
    } else {
      const searchParams = new URLSearchParams({
        callbackUrl: "/gpt/legalGPT",
      }).toString();
      navigate(`/login?${searchParams}`);
    }
  }
  return (
    <div className={Styles.searchContainer}>
      <div className={Styles.searchContent}>
        <div
          style={{
            backgroundColor: "transparent",
            display: "flex",
            padding: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchOutlined
              style={{
                backgroundColor: "transparent",
                color: "#777",
                paddingRight: 5,
              }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                backgroundColor: "transparent",
                width: "100%",
                fontSize: 16,
                outline: "none",
                border: "none",
              }}
              placeholder="Enter Prompt Here ..."
            />
          </div>
          <div className={Styles.buttonContainer}>
            {isLoading ? (
              <CircularProgress
                style={{ padding: 12, fontSize: 14, color: "#008080" }}
              />
            ) : (
              <button
                className={globalStyles.backdrop}
                onClick={onSubmitPrompt}
              >
                Ask LegalGPT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
