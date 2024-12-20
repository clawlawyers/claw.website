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
import { LEGALGPT_ENDPOINT, NODE_API_ENDPOINT } from "../../utils/utils";
import { close, open } from "../../features/popup/popupSlice";
import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";
import { activePlanFeatures } from "../../utils/checkActivePlanFeatures";
import fetchWrapper from "../../utils/fetchWrapper";
import { Close, CoPresentOutlined } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";

export default function SearchGPT({
  sendReferenceMessage,
  summery,
  setsummery,
}) {
  const [query, setQuery] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);

  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState([]);
  const [openLegalGptDialog, setOpenLegalGptDialog] = useState(false);
  console.log(openLegalGptDialog);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "legalGptAccess"));
    }
  }, [plan]);

  async function onSubmitPrompt() {
    if (!query) return;
    // setIsLoading(true);

    if (currentUser) {
      if (plan[0].planName === "FREE" && plan[0].totalUsed >= 15) {
        toast.error("Daily limit already used. Please buy a plan!");
      } else {
        const reqdObj = {
          token: currentUser.jwt,
          callbackUrl: `/gpt/socket`,
          prompt: query,
        };

        const encodedStringBtoA = btoa(JSON.stringify(reqdObj));
        window.open(`${LEGALGPT_ENDPOINT}?user=${encodedStringBtoA}`, "self");
      }
    } else {
      handleModalOpen();
    }
  }

  const handleModalOpen = () => {
    const checkLegalDialogUsed = localStorage.getItem("legalgptUsed");
    if (checkLegalDialogUsed) {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      setOpenLegalGptDialog(true);
      sendReferenceMessage({
        prompt: query,
        context: "",
      });
    }
  };

  const handleModalClose = () => {
    setOpenLegalGptDialog(false);
    setsummery("");
    setQuery("");
    localStorage.setItem("legalgptUsed", true);
  };

  return (
    <>
      <div className={Styles.searchContainer}>
        <div className={Styles.searchContent}>
          <div
            className={Styles.searchContainerChild}
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
                placeholder="Enter Your Prompt Here ..."
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
                  onClick={() => onSubmitPrompt()}
                  // onClick={() => handleModalOpen()}
                >
                  Ask LegalGPT
                </button>
              )}
            </div>
            <Modal open={openLegalGptDialog} onClose={handleModalClose}>
              <div
                // className={Styles.scrollable}
                className="w-[80%] md:w-[60%] bg-white"
                style={{
                  // backgroundColor: "",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  // width: "60%",
                  height: "90%",
                  color: "black",
                  borderRadius: 10,
                  // overflowY: "scroll",
                  // padding: 10,
                  transform: "translate(-50%, -50%)",
                  boxShadow: 24,
                }}
              >
                <div className="w-full bg-[#0F0F0FCC] h-full rounded-lg p-2 flex flex-col border-2 border-white text-black ">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex gap-2">
                      <h1 className="text-3xl font-semibold m-0 text-[#018081]">
                        LegalGPT
                      </h1>
                      <p className="m-0 text-xs pt-1">by CLAW</p>
                    </div>
                    <Close
                      sx={{ color: "white" }}
                      className="cursor-pointer"
                      onClick={handleModalClose}
                    />
                  </div>
                  <div className="flex-1 h-[90%] flex flex-col overflow-auto mt-2">
                    <div className="flex gap-2 p-2">
                      <AccountCircleIcon sx={{ color: "white" }} />
                      <p className="m-0 text-white">{query}</p>
                    </div>
                    <div className="flex-1">
                      {summery === "" ? (
                        <div className="h-full w-full p-3 flex flex-col gap-1">
                          <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-[60%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-[40%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                        </div>
                      ) : (
                        // <div className="h-full flex flex-col overflow-auto pt-2">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: summery,
                          }}
                          className="text-white m-0 border-2 bg-[#222222ef] border-[#018081] rounded-lg p-2"
                        >
                          {/* {summery} */}
                        </p>
                        // </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
