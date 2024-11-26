import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { NODE_API_ENDPOINT } from "../utils/utils";
import fetchWrapper from "../utils/fetchWrapper";
import { useDispatch } from "react-redux";
import {
  removePromptsArr,
  setPromptHistory,
} from "../features/gpt/promptSlice";

export function UserSessions({ jwt, model, startNew, setStartNew }) {
  const [isLoading, setIsLoading] = useState();
  const [sessions, setSessions] = useState([]);
  const { sessionId } = useParams();
  // console.log(startnew);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserSessions() {
      try {
        setIsLoading(true);
        const res = await fetchWrapper.get(
          `${NODE_API_ENDPOINT}/gpt/sessions/${model}`
        );
        // const res = await fetch(`${NODE_API_ENDPOINT}/gpt/sessions/${model}`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${jwt}`,
        //     "Content-Type": "application/json",
        //   },
        // });
        const { data } = await res.json();
        setSessions(data);
        if (!startNew) {
          setStartNew(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserSessions();
  }, [jwt, model, startNew]);
  // }, [jwt, model]);
  return (
    <div style={{ height: "100%" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "white" }} />
        </div>
      ) : (
        <div>
          {sessions?.map(({ name, id }) => (
            <Link
              onClick={() => {
                dispatch(removePromptsArr());
                dispatch(setPromptHistory());
              }}
              key={id}
              className="text-sm gap-2 py-2 px-1"
              style={{
                textDecoration: "none",
                display: "block",
                color: "white",
                border: "none",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                // padding: 12,
                borderRadius: 10,
                backgroundColor: sessionId === id ? "#777" : "inherit",
              }}
              to={`/gpt/socket/v1/${id}`}
              // to={`session/${id}`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
