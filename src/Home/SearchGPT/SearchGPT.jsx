import React, { useState, useEffect, useCallback } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
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
import { close, open } from "../../features/popup/popupSlice";
import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";
import { activePlanFeatures } from "../../utils/checkActivePlanFeatures";

export default function SearchGPT() {
  const [query, setQuery] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);

  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.gpt);

  const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const handlePopupClose = useCallback(() => dispatch(close()), []);

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan));
    }
  }, [plan]);

  // useEffect(() => {
  //   async function fetchGptUser() {
  //     try {
  //       const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${currentUser.jwt}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const parsed = await res.json();

  //       dispatch(setPlan({ plan: parsed.data.plan }));
  //       dispatch(setToken({ token: parsed.data.token }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if (currentUser) fetchGptUser();
  // }, [currentUser, dispatch]);

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
      dispatch(setGpt({ prompt: query }));
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
                color: "black",
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
                onClick={() =>
                  activePlan[0]?.plan.legalGptAccess
                    ? onSubmitPrompt()
                    : handlePopupOpen()
                }
              >
                Ask LegalGPT
              </button>
            )}
          </div>
          <Modal open={isOpen} onClose={handlePopupClose}>
            <div
              style={{
                backgroundColor: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "black",
                borderRadius: 10,
                overflowY: "scroll",
                padding: 10,
                transform: "translate(-50%, -50%)",
                boxShadow: 24,
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={handlePopupClose}
                  style={{
                    border: "none",
                    backgroundColor: "inherit",
                    backgroundImage: "none",
                  }}
                >
                  <ClearIcon style={{ fontSize: 30, color: "black" }} />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  padding: 50,
                }}
              >
                <LockIcon style={{ fontSize: 80, color: "black" }} />
                <h3 style={{ fontSize: 28, fontWeight: 500 }}>Upgrade Now</h3>
                <div style={{ display: "flex", gap: 5 }}>
                  {/* <StudentReferralModal /> */}
                  {/* <button
                onClick={topuphandler}
                className={Style.backdropImg}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                  padding: 10,
                }}
              >
                <Link
                  className={Style.linkImg}
                  to="/paymentgateway"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    width: "fit-content",
                    border: "none",
                  }}
                >
                  Top Up 25 Rs
                </Link>
              </button> */}
                  <button
                    onClick={handlePopupClose}
                    className={Styles.backdropImg}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                      padding: 10,
                    }}
                  >
                    <Link
                      className={Styles.linkImg}
                      to="/pricing"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        width: "fit-content",
                        border: "none",
                      }}
                    >
                      Buy Credits
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
