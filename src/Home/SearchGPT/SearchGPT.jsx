import React, { useState, useEffect, useCallback } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

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
  const [login, setLogin] = useState(false);

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
        setQuery("");
        navigate("/pricing");
      } else {
        const reqdObj = {
          token: currentUser.jwt,
          callbackUrl: `/gpt/socket`,
          prompt: query,
        };

        const encodedStringBtoA = btoa(JSON.stringify(reqdObj));
        window.open(`${LEGALGPT_ENDPOINT}?user=${encodedStringBtoA}`, "self");
        setQuery("");
      }
    } else {
      handleModalOpen();
    }
  }

  const handleModalOpen = () => {
    const checkLegalDialogUsed = localStorage.getItem("legalgptUsed");
    console.log(checkLegalDialogUsed);
    if (checkLegalDialogUsed) {
      toast.error("Please login to continue for more!");
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
    setLogin(true);
    // document.body.style.overflow = "hidden";
    setsummery("");
    setQuery("");
    localStorage.setItem("legalgptUsed", true);
  };

  const handleClose = () => {
    setLogin(false);
    // document.body.style.overflow = "auto"; // Enable scrolling
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
            }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
              }}>
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
                className="w-[80%] md:w-[60%]  bg-white"
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
                }}>
                <div className="w-full bg-[#0F0F0FCC] h-full rounded-lg  pb-4 flex flex-col border-2 border-white text-black">
                  {/* Header Section */}
                  <div className="bg-white rounded-t-lg">
                    <p className="text-teal-800 pt-2 font-bold  text-xl text-center">
                      SINGLE USE TRIAL
                    </p>
                  </div>

                  {/* Title and Close Button Section */}
                  <div className="flex justify-between items-center mx-2 px-4 mt-2">
                    <div className="flex gap-2 items-center">
                      <h1 className="text-3xl font-semibold text-[#018081]">
                        LegalGPT
                      </h1>
                      <p className="text-xs pt-1 text-gray-300">by CLAW</p>
                    </div>
                    <Close
                      sx={{ color: "white" }}
                      className="cursor-pointer"
                      onClick={handleModalClose}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 px-4 h-[40%] flex flex-col overflow-auto mt-2">
                    {/* Query Section */}
                    <div className="flex gap-2 p-2 items-center">
                      <AccountCircleIcon sx={{ color: "white" }} />
                      <p className="m-0 text-white">{query}</p>
                    </div>

                    {/* Summary Section */}
                    <div className="flex-1">
                      {summery === "" ? (
                        <div className="h-full w-full p-3 flex flex-col gap-1">
                          {/* Loading Animation */}
                          <div className="w-full h-2 bg-slate-600 animate-pulse rounded-full"></div>
                          <div className="w-full h-2 bg-slate-600 animate-pulse rounded-full"></div>
                          <div className="w-[60%] h-2 bg-slate-600 animate-pulse rounded-full"></div>
                          <div className="w-[40%] h-2 bg-slate-600 animate-pulse rounded-full"></div>
                        </div>
                      ) : (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: summery,
                          }}
                          className="text-white m-0 border-2 bg-[#222222ef] border-[#018081] rounded-lg p-2"></p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            {login && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Background Blur */}
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

                {/* Modal Container */}
                <div className="relative w-[600px] rounded-lg border border-[#018081] bg-[#0F1924] text-white shadow-lg">
                  {/* Title and Close Icon */}
                  <CloseIcon
                    className="cursor-pointer right-2 top-2 absolute rounded-full border-2 border-bg-teal-800 text-white hover:text-gray-300"
                    onClick={handleClose}
                  />
                  <div className="flex justify-center items-center px-6 py-6 pt-4">
                    <div className="flex gap-2 items-center">
                      <h1 className="text-3xl text-center font-bold text-[#018081]">
                        LegalGPT
                      </h1>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-4">
                    <p className="text-center py-2 text-md text-gray-300 mb-6">
                      To Continue Using Complete Features Of LegalGPT
                      <br />
                      Please Log In
                    </p>
                    <div className="flex justify-center w-full gap-4">
                      <button className="px-6 py-2 border-2 border-bg-white w-full bg-[#018081] text-white rounded-md hover:bg-[#016969] transition">
                        <Link className="text-white no-underline" to="/login">
                          Log In
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
