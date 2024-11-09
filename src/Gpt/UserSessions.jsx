import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { NODE_API_ENDPOINT } from "../utils/utils";
import fetchWrapper from "../utils/fetchWrapper";

export function UserSessions({ jwt, model, startnew, setStartNew }) {
  const [isLoading, setIsLoading] = useState();
  const [sessions, setSessions] = useState([]);
  const { sessionId } = useParams();
  console.log(startnew);

  useEffect(() => {
    async function fetchUserSessions() {
      try {
        setIsLoading(true);
        const res = await fetchWrapper.get(`${NODE_API_ENDPOINT}/gpt/sessions/${model}`)
        // const res = await fetch(`${NODE_API_ENDPOINT}/gpt/sessions/${model}`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${jwt}`,
        //     "Content-Type": "application/json",
        //   },
        // });
        const { data } = await res.json();
        setSessions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserSessions();
  }, [jwt, model, startnew]);
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
              key={id}
              style={{
                textDecoration: "none",
                display: "block",
                color: "white",
                border: "none",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                padding: 12,
                gap: 15,
                borderRadius: 10,
                backgroundColor: sessionId === id ? "#777" : "inherit",
              }}
              to={`session/${id}`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
