import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Style from "./Sidebar.module.css";
import { UserSessions } from "./UserSessions";
import clawLogo from "../assets/icons/clawlogo.png";
import { useAuthState } from "../hooks/useAuthState";
import HeaderStyles from "../Header/Header.module.css";
import { collapse, expand, toggle } from "../features/sidebar/sidebarSlice";
import { open } from "../features/popup/popupSlice";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { Home } from "@mui/icons-material";
import whatLegal from "../assets/images/whatLegal.gif";
import { activePlanFeatures } from "../utils/checkActivePlanFeatures";

export default function Sidebar({ keyword, primaryColor, model }) {
  const isPhoneMode = useMediaQuery({ query: "(max-width:768px)" });
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { plan } = useSelector((state) => state.gpt);
  // const token = useSelector((state) => state.gpt.token);
  const { isAuthLoading } = useAuthState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [startnew, setStartNew] = useState(0);
  const [legalGptOpen, setLegalGptOpen] = useState(false);
  const [activePlan, setActivePlan] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#018081",
    border: "2px solid white",
    boxShadow: 24,
    p: 4,
    height: "45%",
    width: "40%",
  };

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan));
    }
  }, [plan]);

  function handleAccount() {
    if (!currentUser) navigate("/login");
  }
  async function handleClearConversations() {
    try {
      setLoading(true);
      await fetch(`${NODE_API_ENDPOINT}/gpt/sessions/legalGPT`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (keyword === "Legal") navigate("/gpt/legalGPT");
      else navigate("/gpt/finGPT");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function handleNewConversation() {
    if (keyword === "Legal") navigate("/gpt/legalGPT");
    else navigate("/gpt/finGPT");

    setStartNew(startnew + 1);
  }
  useEffect(() => {
    if (isPhoneMode) dispatch(collapse());
    else dispatch(expand());
  }, [isPhoneMode]);
  return (
    <div className={Style.sidebarContainer}>
      {collapsed && !isPhoneMode && (
        <button
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            backgroundColor: "transparent",
            zIndex: 4,
            border: "none",
            backgroundImage: "none",
          }}
        >
          <MenuOutlinedIcon
            onClick={() => dispatch(toggle())}
            style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }}
          />
        </button>
      )}
      {!isPhoneMode && !collapsed && (
        <button
          style={{
            position: "absolute",
            top: 20,
            left: 225,
            backgroundColor: "transparent",
            backgroundImage: "none",
            zIndex: 8,
            border: "none",
          }}
        >
          <MenuOutlinedIcon
            onClick={() => dispatch(toggle())}
            style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }}
          />
        </button>
      )}
      {isPhoneMode && collapsed && (
        <div className="absolute p-2 w-full bg-[#018081]  z-10 flex justify-between items-center">
          <h3 className="m-0 pl-3">CLAW</h3>
          <MenuOutlinedIcon
            onClick={() => dispatch(toggle())}
            style={{ color: "white", fontSize: 40, backgroundColor: "inherit" }}
          />
        </div>
      )}
      {!collapsed && !isPhoneMode && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundColor: "transparent",
          }}
        >
          <div className={Style.sidebar}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 25,
                width: "100%",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div
                onClick={handleAccount}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  border: "none",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  padding: 15,
                  gap: 15,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 40,
                      backgroundColor: primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StarIcon style={{ backgroundColor: "transparent" }} />
                  </div>
                  {!isAuthLoading ? (
                    <div style={{ fontSize: 16 }}>
                      {currentUser ? currentUser.phoneNumber : <>Guest</>}
                    </div>
                  ) : (
                    <CircularProgress style={{ padding: 10, color: "white" }} />
                  )}
                </div>
                {!isAuthLoading ? (
                  <div style={{ flex: 1, textAlign: "left" }}>
                    {/* <div style={{ fontSize: 16 }}>
                      {currentUser ? currentUser.phoneNumber : <>Guest</>}
                    </div> */}
                    <div style={{ fontSize: 14, color: "#777" }}>
                      {plan ? (
                        <>
                          <div>
                            <span className="text-white">Plan Type : </span>
                            <span style={{ textTransform: "capitalize" }}>
                              {activePlan.length
                                ? activePlan[0]?.planName?.split("_")[0]
                                : " No Plan"}
                              {/* No Plan */}
                            </span>
                          </div>
                          {/* {plan.length && (
                            <div>
                              <span className="text-white">Token : </span>
                              {Math.floor(token?.used?.gptTokenUsed)}/
                              {token?.total?.totalGptTokens}
                            </div>
                          )} */}
                          <div className="mt-3 flex">
                            <button
                              style={{
                                display: "flex",
                                color: "white",
                                border: "none",
                                padding: "6px 20px",
                                marginTop: 5,
                                borderRadius: 5,
                                backgroundColor: primaryColor,
                              }}
                              onClick={() => dispatch(open())}
                            >
                              Upgrade
                            </button>
                            {/* <button
                              style={{
                                display: "flex",
                                color: "#00969A",
                                border: "none",
                                padding: "6px 20px",
                                marginTop: 5,
                                borderRadius: 5,
                                background: "white",
                              }}
                            >
                              Log Out
                            </button> */}
                          </div>
                        </>
                      ) : (
                        <CircularProgress
                          style={{ padding: 10, color: "white" }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <CircularProgress style={{ color: "white" }} size={14} />
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 12,
                    gap: 15,
                  }}
                >
                  <div>
                    <img src={whatLegal} />
                    {/* <ChatBubbleOutlineIcon
                      style={{ backgroundColor: "transparent" }}
                    /> */}
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => setLegalGptOpen(true)}
                  >
                    What is {keyword}GPT
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    color: "white",
                    border: "none",
                    padding: 12,
                    gap: 15,
                    borderRadius: 10,
                    backgroundColor: primaryColor,
                  }}
                  onClick={handleNewConversation}
                >
                  <div>
                    <AddIcon style={{ backgroundColor: "transparent" }} />
                  </div>
                  <div>Start a new chat</div>
                </button>
                <div style={{ flex: 1, overflow: "scroll" }}>
                  {currentUser && !isAuthLoading && !loading && (
                    <UserSessions
                      model={model}
                      jwt={currentUser.jwt}
                      setStartNew={setStartNew}
                      startnew={startnew}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid white",
                width: "100%",
                padding: 10,
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={HeaderStyles.headerLogo}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Home />
                  <img
                    alt="Claw"
                    style={{
                      backgroundColor: "transparent",
                      height: "100%",
                      marginTop: 8,
                    }}
                    src={clawLogo}
                  />
                </Link>
              </div>
              {/* <button
                onClick={handleClearConversations}
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  border: "none",
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                }}
              >
                <DeleteOutlineOutlinedIcon
                  style={{ backgroundColor: "transparent" }}
                />
              </button> */}
            </div>
          </div>
          <div
            style={{ flex: 1, zIndex: 6, backgroundColor: "transparent" }}
            onClick={() => dispatch(collapse())}
          />
        </div>
      )}
      {!collapsed && isPhoneMode && (
        <div className="relative">
          <div className="absolute p-2 w-full bg-[#018081]  z-10 flex justify-between items-center">
            <h3 className="m-0 pl-3">CLAW</h3>
            <MenuOutlinedIcon
              onClick={() => dispatch(toggle())}
              style={{
                color: "white",
                fontSize: 40,
                backgroundColor: "inherit",
              }}
            />
          </div>
          <div
            style={{
              zIndex: "11",
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              backgroundColor: "transparent",
            }}
          >
            <div
              className={Style.sidebar}
              style={{ background: "#018081", height: "100vh" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 25,
                  width: "100%",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={handleAccount}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    border: "none",
                    backgroundColor: "#303030",
                    padding: 15,
                    gap: 15,
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        backgroundColor: primaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <StarIcon style={{ backgroundColor: "transparent" }} />
                    </div>
                    {!isAuthLoading ? (
                      <div style={{ fontSize: 16 }}>
                        {currentUser ? currentUser.phoneNumber : <>Guest</>}
                      </div>
                    ) : (
                      <CircularProgress
                        style={{ padding: 10, color: "white" }}
                      />
                    )}
                  </div>
                  {!isAuthLoading ? (
                    <div style={{ flex: 1, textAlign: "left" }}>
                      {/* <div style={{ fontSize: 16 }}>
                      {currentUser ? currentUser.phoneNumber : <>Guest</>}
                    </div> */}
                      <div style={{ fontSize: 14, color: "#777" }}>
                        {activePlan ? (
                          <>
                            <div>
                              <span className="text-white">Plan Type : </span>
                              <span style={{ textTransform: "capitalize" }}>
                                {activePlan.length
                                  ? activePlan[0]?.planName?.split("_")[0]
                                  : " No Plan"}
                                {/* No Plan */}
                              </span>
                            </div>
                            {/* {plan.length && (
                              <div>
                                <span className="text-white">Token : </span>
                                {Math.floor(token?.used?.gptTokenUsed)}/
                                {token?.total?.totalGptTokens}
                              </div>
                            )} */}
                            <div className="mt-3 flex">
                              <button
                                style={{
                                  display: "flex",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 20px",
                                  marginTop: 5,
                                  borderRadius: 5,
                                  backgroundColor: primaryColor,
                                }}
                                onClick={() => dispatch(open())}
                              >
                                Upgrade
                              </button>
                              {/* <button
                              style={{
                                display: "flex",
                                color: "#00969A",
                                border: "none",
                                padding: "6px 20px",
                                marginTop: 5,
                                borderRadius: 5,
                                background: "white",
                              }}
                            >
                              Log Out
                            </button> */}
                            </div>
                          </>
                        ) : (
                          <CircularProgress
                            style={{ padding: 10, color: "white" }}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <CircularProgress style={{ color: "white" }} size={14} />
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 12,
                      gap: 15,
                    }}
                  >
                    <div>
                      <img src={whatLegal} />
                      {/* <ChatBubbleOutlineIcon
                      style={{ backgroundColor: "transparent" }}
                    /> */}
                    </div>

                    <div>
                      <button onClick={() => setLegalGptOpen(true)}>
                        What s {keyword}GPT
                      </button>
                    </div>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      color: "white",
                      border: "none",
                      padding: 12,
                      gap: 15,
                      borderRadius: 10,
                      backgroundColor: primaryColor,
                    }}
                    onClick={handleNewConversation}
                  >
                    <div>
                      <AddIcon style={{ backgroundColor: "transparent" }} />
                    </div>
                    <div>Start a new chat</div>
                  </button>
                  <div style={{ flex: 1, overflow: "scroll" }}>
                    {currentUser && !isAuthLoading && !loading && (
                      <UserSessions
                        model={model}
                        jwt={currentUser.jwt}
                        setStartNew={setStartNew}
                        startnew={startnew}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid white",
                  width: "100%",
                  padding: 10,
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className={HeaderStyles.headerLogo}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Home />
                    <img
                      alt="Claw"
                      style={{
                        backgroundColor: "transparent",
                        height: "100%",
                        marginTop: 8,
                      }}
                      src={clawLogo}
                    />
                  </Link>
                </div>
                {/* <button
                onClick={handleClearConversations}
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  border: "none",
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                }}
              >
                <DeleteOutlineOutlinedIcon
                  style={{ backgroundColor: "transparent" }}
                />
              </button> */}
              </div>
            </div>
            <div
              style={{ flex: 1, zIndex: 6, backgroundColor: "transparent" }}
              onClick={() => dispatch(collapse())}
            />
          </div>
        </div>
      )}
      <Modal
        open={legalGptOpen}
        onClose={() => {
          setLegalGptOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="overflow-scroll  gap-6 flex flex-col rounded-xl"
        >
          <div className="font-sans text-lg text-justify text-white">
            LegalGPT leverages advanced AI technology to provide insightful
            legal assistance, automate document creation, and streamline legal
            research. It combines the power of GPT (Generative Pre-trained
            Transformer) technology with legal expertise, offering lawyers and
            law firms the ability to efficiently navigate complex legal
            scenarios, draft legal documents, and even simulate court
            proceedings. This tool is particularly useful for professionals
            seeking to optimize their workflow by reducing time spent on
            repetitive tasks and improving the accuracy of their legal research
            and documentation. LegalGPT is part of Claw's broader suite of
            services aimed at revolutionizing legal practice through the
            integration of AI and automation.
          </div>
        </Box>
      </Modal>
    </div>
  );
}
