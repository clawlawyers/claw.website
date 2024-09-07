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
import markdownit from "markdown-it";
import { CircularProgress } from "@mui/material";

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
  let containerStyles = { width: "90%" };
  const md = markdownit({
    // Enable HTML tags in source
    html: true,

    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut: true,

    // Convert '\n' in paragraphs into <br>
    breaks: true,

    // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    langPrefix: "language-",

    // Autoconvert URL-like text to links
    linkify: true,

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (/*str, lang*/) {
      return "";
    },
  });
  const { prompt, status, response, error, relatedCases, plan } = useSelector(
    (state) => state.gpt
  );
  const currentUser = useSelector((state) => state.auth.user);
  // const planDetails = useSelector((state) => state.gpt?.plan[0]?.plan);

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
  const [boolFlag, setBoolFlag] = useState(false);

  const handleHighCourtChange = (event) => {
    setcourtName(event.target.value);
  };

  const handleHighCourtNameChange = async () => {
    // console.log(event.target.value);
    // console.log(courtName);

    dispatch(setRelatedCases({}));

    await fetchRelatedCases();
    // console.log(courtName);
  };

  useEffect(() => {
    if (boolFlag) {
      handleHighCourtNameChange();
    }
  }, [courtName]);

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
  const formatText = (text) => {
    return text
      .replace(/\\n\\n/g, "<br/><br/>") // Ensure two \n result in a new paragraph
      .replace(/\\n/g, "  <br/>")
      .replace(/\u20B9/g, "₹");
  };

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
    setRefRelevantCase(null);
    setRefSupremeCase(null);
    setShowRelevantCase(false);
    setSupremeCourtCases(false);
    return () => dispatch(resetGpt());
  }, [sessionId]);

  async function submitPrompt({ query }) {
    console.log(query);
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
    setBoolFlag(true);

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
    if (refRelevantCase) {
      return;
    }
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

      console.log("");
      const responsetext = formatText(response.data.references);
      setRefRelevantCase(await md.render(responsetext));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //for supreme court cases api call
  const handleShowSupremeCourtJudgements = async () => {
    if (refSupremeCase) {
      return;
    }
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
      const responsetext = formatText(response.data.judgments);
      setRefSupremeCase(await md.render(responsetext));
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
                      onClick={() => {
                        fetchRelatedCases();
                      }}
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
                      <div className="flex flex-col flex-wrap md:flex-row justify-between md:items-center">
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
                                  {x}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
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
                    <div className="flex flex-col md:flex-row mt-[5px] gap-[5px] p-[10px]">
                      {plan ? (
                        <>
                          {!plan[0]?.plan?.AICaseSearchAccess ? (
                            <Link
                              to={`/case/search?id=${relatedCases.messageId}`}
                            >
                              <button
                                className="px-1"
                                style={{
                                  borderRadius: 5,
                                  backgroundColor: "#008080",
                                  color: "white",
                                  textDecoration: "none",
                                  width: "fit-content",
                                  border: "1px solid white",
                                }}
                              >
                                Case search
                              </button>
                            </Link>
                          ) : (
                            <button
                              onClick={handlePopupOpen}
                              className="px-1"
                              style={{
                                borderRadius: 5,
                                backgroundColor: "#008080",
                                color: "white",
                                textDecoration: "none",
                                width: "fit-content",
                                border: "1px solid white",
                              }}
                            >
                              Case search
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="px-1"
                          style={{
                            borderRadius: 5,
                            backgroundColor: "#008080",
                            color: "white",
                            textDecoration: "none",
                            width: "fit-content",
                            border: "1px solid white",
                          }}
                        >
                          <CircularProgress size={20} color="inherit" />
                        </button>
                      )}
                      <button
                        onClick={handleShowRelevantAct}
                        className="px-1"
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#008080",
                          color: "white",
                          textDecoration: "none",
                          // padding: 10,
                          width: "fit-content",
                          border: "1px solid white",
                        }}
                      >
                        References
                      </button>
                      <button
                        onClick={handleShowSupremeCourtJudgements}
                        className="px-1 "
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#008080",
                          color: "white",
                          textDecoration: "none",
                          // padding: 10,
                          width: "fit-content",
                          border: "1px solid white",
                        }}
                      >
                        Supreme Court Judgement
                      </button>
                      {/* </div> */}
                      <button
                        className="px-1"
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#008080",
                          color: "white",
                          textDecoration: "none",
                          // padding: 10,
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
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: refRelevantCase,
                              }}
                            >
                              {/* <ReactMarkdown>{refRelevantCase}</ReactMarkdown> */}
                              {/* (refRelevantCase) */}
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
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: refSupremeCase,
                              }}
                            >
                              {/* <ReactMarkdown>{refSupremeCase}</ReactMarkdown> */}
                              {/* {refSupremeCase}/ */}
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
