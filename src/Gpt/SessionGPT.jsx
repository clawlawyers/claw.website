import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Style from "./LegalGPT.module.css";
import { Prompt } from "./components/Prompt";
import { CasecardGpt } from "./components/CasecardGpt.jsx";
import clawImg from "../assets/images/gptclaw.PNG";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useAuthState } from "../hooks/useAuthState";
import { CustomLoader } from "./components/CustomLoader";
import CustomInputForm from "./components/CustomInputForm";
import {
  generateResponse,
  resetGpt,
  setGpt,
  setPlan,
  setRelatedCases,
  setToken,
} from "../features/gpt/gptSlice.js";
import { open } from "../features/popup/popupSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const highCourtArr = [
  "Supreme Court of India",
  "Chattisgarh High Court",
  "Sikkim High Court",
  "Uttarakhand High Court",
  "Calcutta High Court",
  "Delhi High Court",
  "Jammu and Kashmir High Court",
  "Gujarat High Court",
  "Delhi District Court",
  "Rajasthan High Court",
];

export default function SessionGPT({ model, primaryColor }) {
  let containerStyles = { width: "100%" };
  const { prompt, status, response, error, relatedCases } = useSelector(
    (state) => state.gpt
  );
  const currentUser = useSelector((state) => state.auth.user);
  const [query, setQuery] = useState("");
  const [prompts, setPrompts] = useState([]);
  const { isAuthLoading } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const promptsRef = useRef(null);
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [courtName, setcourtName] = useState("");
  const [caseCount, setCaseCount] = useState(2);
  const [showRelevantCase, setShowRelevantCase] = useState(false);
  const [refRelevantCase, setRefRelevantCase] = useState(null);
  const [showSupremeCourtCases, setSupremeCourtCases] = useState(false);
  const [refSupremeCase, setRefSupremeCase] = useState(null);
  const [highCourtName, setHighCourtName] = useState("");

  const handleHighCourtChange = async (event) => {
    setcourtName(event.target.value);
    console.log(event.target.value);
    console.log(courtName);

    dispatch(setRelatedCases({}));

    await fetchRelatedCases();
    console.log(courtName);
  };

  const greetingRegex =
    /\b(hello|namaste|hola|hey|how are you|greetings|(hi+))\b/gi;
  const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const isGreeting =
    prompts.length > 0 && greetingRegex.test(prompts[prompts.length - 1].text);
  const showUpgrade =
    prompts.length > 0 &&
    prompts[prompts.length - 1].id !== relatedCases.messageId &&
    isError;

  useEffect(() => {
    if (status === "succeeded" && response) {
      setIsLoading(false);
      setPrompts((prompts) => [
        ...prompts,
        {
          id: response?.gptResponse?.messageId,
          text: response?.gptResponse?.message,
          isUser: false,
        },
      ]);
    } else if (status === "failed") {
      setIsLoading(false);
      setIsError(true);
      handlePopupOpen();
    }
  }, [status, handlePopupOpen]);

  useEffect(() => {
    if (prompt) {
      setIsLoading(true);
      setPrompts([{ text: prompt, isUser: true }]);
    }
  }, []);

  useEffect(() => {
    if (promptsRef.current) {
      promptsRef.current.scrollTop = promptsRef.current.scrollHeight;
    }
  }, [prompts]);

  useEffect(() => {
    let userlocation = localStorage.getItem("userLocation");

    if (userlocation === "Chhattisgarh" || userlocation === "chhattisgarh")
      setcourtName("Chattisgarh High Court");
    else if (userlocation === "Sikkim" || userlocation === "sikkim")
      setcourtName("Sikkim High Court");
    else if (userlocation === "Uttarakhand" || userlocation === "uttarakhand")
      setcourtName("Uttarakhand High Court");
    else if (
      userlocation === "Calcutta" ||
      userlocation === "calcutta" ||
      userlocation === "Kolkata"
    )
      setcourtName("Calcutta High Court");
    else if (userlocation === "Jammu and Kashmir")
      setcourtName("Jammu and Kashmir High Court");
    else if (userlocation === "Delhi") setcourtName("Delhi High Court");
    else if (userlocation === "Gujarat" || userlocation === "gujarat")
      setcourtName("Gujarat High Court");
    if (userlocation === "Rajasthan" || userlocation === "rajasthan") {
      setcourtName("Rajasthan High Court");
    } else setcourtName("Supreme Court of India");

    if (!prompt && currentUser) {
      async function fetchSessionMessages() {
        setIsLoading(true);
        const res = await fetch(
          `${NODE_API_ENDPOINT}/gpt/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await res.json();
        setPrompts(data.messages);
        setIsLoading(false);
      }
      fetchSessionMessages();
    } else if (!currentUser) navigate("/legalGPT");
  }, [sessionId, isAuthLoading, navigate]);

  useEffect(() => {
    return () => dispatch(resetGpt());
  }, [sessionId]);

  async function submitPrompt({ query }) {
    setIsLoading(true);
    setQuery({ query });
    setPrompts((prompts) => [...prompts, { text: query, isUser: true }]);
    setShowRelevantCase(false);
    setRefRelevantCase(null);
    setSupremeCourtCases(false);
    setRefSupremeCase(null);
    dispatch(setGpt({ prompt: query }));
    dispatch(generateResponse({ sessionId, model }));
  }

  async function fetchRelatedCases() {
    console.log(courtName);
    setIsLoading(true);
    setCaseCount(2);
    try {
      const res = await fetch(
        `${NODE_API_ENDPOINT}/gpt/case/related/${sessionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courtName: courtName }),
        }
      );
      const { data } = await res.json();
      dispatch(
        setRelatedCases({ messageId: data.messageId, cases: data.relatedCases })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  //for relevant cases api call
  const handleShowRelevantAct = async () => {
    // setRelevantCaseLoading(true);
    setShowRelevantCase(true);
    //api call

    try {
      const fetchData = await fetch(
        `${NODE_API_ENDPOINT}/gpt/session/relevantAct`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const response = await fetchData.json();

      console.log(response.data.references);
      setRefRelevantCase(response.data.references);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //for supreme court cases api call
  const handleShowSupremeCourtJudgements = async () => {
    // setSupremeCourtLoading(true);
    setSupremeCourtCases(true);
    //api call
    try {
      const fetchData = await fetch(
        `${NODE_API_ENDPOINT}/gpt/session/judgement`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const response = await fetchData.json();

      console.log(response.data.judgments);
      setRefSupremeCase(response.data.judgments);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // setRelevantCaseLoading(false);
    // setSupremeCourtCases(false);
  };

  return (
    <div className={Style.formContainer}>
      <div className="flex justify-start items-start pl-[35px] pb-3 gap-3">
        <h3 className="m-0 text-[#018081] font-bold">LegalGPT</h3>
        <p className="m-0 text-xs pt-[3px]">by Claw</p>
      </div>
      <div ref={promptsRef} className={Style.prompts}>
        {/* <div className={Style.clawBackdrop}>
          <img alt="claw icon" src={clawImg} />
        </div> */}
        <div className={Style.subContainer}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            {prompts.map(({ text, isUser }, idx) => (
              <Prompt
                primaryColor={primaryColor}
                key={idx}
                text={text}
                isUser={isUser}
              />
            ))}

            {isLoading && (
              <div className="h-full w-full p-3 flex flex-col gap-2">
                <div className="w-full h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-full h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-[60%] h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-[40%] h-3 bg-slate-600 animate-pulse  rounded-full"></div>
              </div>
            )}
            {isError && (
              <Prompt
                primaryColor={"red"}
                key={"error"}
                text={error.message}
                isUser={false}
              />
            )}
            <div className="p-3">
              {!isLoading &&
                !isGreeting &&
                (showUpgrade ? (
                  <button
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#008080",
                      color: "white",
                      textDecoration: "none",
                      padding: 10,
                      width: "fit-content",
                      border: "none",
                    }}
                    onClick={handlePopupOpen}
                  >
                    Upgrade
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#008080",
                        color: "white",
                        textDecoration: "none",
                        padding: 10,
                        width: "fit-content",
                        border: "1px solid white",
                      }}
                      onClick={fetchRelatedCases}
                    >
                      Load cases
                    </button>
                    {/* <button
                      onClick={handleShowRelevantAct}
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#008080",
                        color: "white",
                        textDecoration: "none",
                        padding: 10,
                        width: "fit-content",
                        border: "1px solid white",
                      }}
                    >
                      Ref. To Relavant Act
                    </button>
                    <button
                      onClick={handleShowSupremeCourtJudgements}
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#008080",
                        color: "white",
                        textDecoration: "none",
                        padding: 10,
                        width: "fit-content",
                        border: "1px solid white",
                      }}
                    >
                      Ref. to Supreme Court Judgement
                    </button> */}
                  </div>
                ))}
            </div>
            <div>
              {!isGreeting &&
                relatedCases.messageId &&
                prompts.length > 0 &&
                prompts[prompts.length - 1].id === relatedCases.messageId &&
                relatedCases.cases.length > 0 && (
                  <div>
                    <div className="m-2 p-3 border-2 border-[#018081] rounded bg-[#303030] flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <p className="font-bold m-0 px-3 text-2xl text-white">
                          Reference to High Court Judgements
                        </p>
                        <div>
                          <FormControl
                            sx={{
                              m: 1,
                              minWidth: 120,
                              background: "white",
                              borderRadius: "4px",
                            }}
                            size="small"
                          >
                            <Select
                              value={courtName}
                              onChange={handleHighCourtChange}
                              displayEmpty
                              autoWidth
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem disabled value="">
                                <em>Select a High Court</em>
                              </MenuItem>
                              {highCourtArr.map((x, index) => (
                                <MenuItem key={index} value={x}>
                                  {x} High Court
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      {/* {highCourtJudgeMent ? (
                        <div className="text-sm">
                          What is Lorem Ipsum? Lorem Ipsum is simply dummy text
                          of the printing and typesetting industry. Lorem Ipsum
                          has been the industry's standard dummy text ever since
                          the 1500s, when an unknown printer took a galley of
                          type and scrambled it to make a type specimen book. It
                          has survived not only five centuries, but also the
                          leap into electronic typesetting, remaining
                          essentially unchanged.
                        </div>
                      ) : (
                        <div className="h-full w-full p-3 flex flex-col gap-2">
                          <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                          <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                          <div className="w-[60%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                          <div className="w-[40%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                        </div>
                      )} */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                          marginTop: 5,
                          padding: "0px 10px",
                        }}
                      >
                        {relatedCases.cases
                          .slice(0, caseCount)
                          .map((relatedCase) => {
                            return (
                              <CasecardGpt
                                messageId={relatedCases.messageId}
                                name={relatedCase.Title}
                                caseId={relatedCase.case_id}
                                citations={relatedCase.num_cites}
                                date={relatedCase.Date}
                                court={relatedCase.court}
                                key={relatedCase.id}
                                query={query}
                              />
                            );
                          })}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 5,
                        padding: "10px",
                      }}
                    >
                      <div className="flex gap-2">
                        <Link to={`/case/search?id=${relatedCases.messageId}`}>
                          <button
                            style={{
                              borderRadius: 5,
                              backgroundColor: "#008080",
                              color: "white",
                              textDecoration: "none",
                              padding: 10,
                              width: "fit-content",
                              border: "1px solid white",
                            }}
                          >
                            Case search
                          </button>
                        </Link>
                        <button
                          onClick={handleShowRelevantAct}
                          style={{
                            borderRadius: 5,
                            backgroundColor: "#008080",
                            color: "white",
                            textDecoration: "none",
                            padding: 10,
                            width: "fit-content",
                            border: "1px solid white",
                          }}
                        >
                          Ref. To Relavant Act
                        </button>
                        <button
                          onClick={handleShowSupremeCourtJudgements}
                          style={{
                            borderRadius: 5,
                            backgroundColor: "#008080",
                            color: "white",
                            textDecoration: "none",
                            padding: 10,
                            width: "fit-content",
                            border: "1px solid white",
                          }}
                        >
                          Ref. to Supreme Court Judgement
                        </button>
                      </div>
                      <button
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#008080",
                          color: "white",
                          textDecoration: "none",
                          padding: 10,
                          width: "fit-content",
                          border: "1px solid white",
                        }}
                        onClick={() =>
                          setCaseCount((caseCount) => caseCount + 2)
                        }
                      >
                        Load more
                      </button>
                    </div>
                    <div>
                      {showRelevantCase ? (
                        <div className="m-2 p-3 border-2 border-white rounded bg-[#018081] flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <p className="font-bold m-0 px-3 text-2xl text-white">
                              Reference to Relevant Cases
                            </p>
                          </div>
                          {refRelevantCase ? (
                            <div className="text-sm">
                              <ReactMarkdown>{refRelevantCase}</ReactMarkdown>
                            </div>
                          ) : (
                            <div className="h-full w-full p-3 flex flex-col gap-2">
                              <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-[60%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-[40%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}

                      {showSupremeCourtCases ? (
                        <div className="m-2 p-3 border-2 border-white rounded bg-[#018081] flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <p className="font-bold m-0 px-3 text-2xl text-white">
                              Reference to Supreme Court Judgements
                            </p>
                          </div>
                          {refSupremeCase ? (
                            <div className="text-sm">
                              <ReactMarkdown>{refSupremeCase}</ReactMarkdown>
                            </div>
                          ) : (
                            <div className="h-full w-full p-3 flex flex-col gap-2">
                              <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-full h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-[60%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                              <div className="w-[40%] h-3 bg-slate-300 animate-pulse  rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* <div>
                        {isLoading && (
                            <div style={{ width: "100%", height: "100%" }}>
                                <CustomLoader />
                            </div>
                        )}
                        {isError && (
                            <Prompt primaryColor={"red"} key={'error'} text={error.message} isUser={false} />
                        )}
                        {!isLoading && !isGreeting && (showUpgrade ? <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={handlePopupOpen}>Upgrade</button> : <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={fetchRelatedCases}>Load cases</button>)}
                        <div >
                            {!isGreeting && relatedCases.messageId && prompts.length > 0 && prompts[prompts.length - 1].id === relatedCases.messageId && relatedCases.cases.length > 0 && (
                                <div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 5 }}>
                                        {relatedCases.cases.slice(0, caseCount).map((relatedCase) => {
                                            return <CaseCard
                                                messageId={relatedCases.messageId}
                                                name={relatedCase.Title}
                                                caseId={relatedCase.case_id}
                                                citations={relatedCase.num_cites}
                                                date={relatedCase.Date}
                                                court={relatedCase.court}
                                                key={relatedCase.id}
                                            />
                                        })}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                                        <Link style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} to={`/case/search?id=${relatedCases.messageId}`}>Case search</Link>
                                        <button style={{ borderRadius: 15, backgroundColor: "#008080", color: "white", textDecoration: "none", padding: 10, width: "fit-content", border: "none" }} onClick={() => setCaseCount(caseCount => caseCount + 2)}>Load more</button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    {/* <div>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={1}

                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" sx={{ color: "white" }} />}
                        />
                    </div> */}
        </div>
      </div>
      <CustomInputForm
        containerStyles={containerStyles}
        primaryColor={primaryColor}
        isError={isError}
        isLoading={isLoading}
        onSubmit={submitPrompt}
      />
    </div>
  );
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};
