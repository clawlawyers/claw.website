import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  removePromptsArr,
  setDataUsingIndex,
  setLoadUserSessions,
  setMessageIdPromptData,
  setNewPromptData,
  setPromptHistory,
  setPromptLoading,
  setPromptsArrAction,
} from "../../features/gpt/promptSlice";
import {
  CircularProgress,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Select,
  TextField,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./WebSocket.css";
import UploadIcon from "../../assets/icons/Upload.png";
import { Close, MoreVert } from "@mui/icons-material";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import regenerateIcon from "../../assets/images/regenerate.png";
import translateIcon from "../../assets/icons/translate.png";
import AudioPlayer from "../components/AudioPlay1";
import { setRelatedCases } from "../../features/gpt/gptSlice";
import { CasecardGpt } from "../components/CasecardGpt";
import markdownit from "markdown-it";
import fetchWrapper from "../../utils/fetchWrapper";
import { useAuthState } from "../../hooks/useAuthState";

const languageArr = [
  "English",
  "Hindi",
  "Bengali",
  "Punjabi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Odia",
  "Urdu",
  "Assamese",
  "Maithili",
  "Dogri",
  "Nepali",
  "Sindhi",
  "Sanskrit",
];

const multilingualSupportLanguages = [
  "Hindi",
  "Bengali",
  "Gujarati",
  "Marathi",
  "Punjabi",
  "English",
  "Kannada",
  "Telugu",
  "Tamil",
  "Malyalam",
];

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

const WebSocketComponent = () => {
  const [promptsArr, setPromptsArr] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 100;
  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fileDialog, setFileDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [textLoading, setTextLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [anchorElTranslate, setAnchorElTranslate] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [anchorElAudio, setAnchorElAudio] = useState(false);
  const [suggestedQuestionsIsLoading, setSuggestedQuestionsIsLoading] =
    useState(false);
  const [aiSuggestedQuestions, setAiSuggestedQuestions] = useState([]);
  const [caseCount, setCaseCount] = useState(2);
  const [courtName, setcourtName] = useState("Supreme Court of India");
  const [casesLoading, setCasesLoading] = useState(false);
  const [showCasesDialog, setShowCasesDialog] = useState(false);
  const [refRelevantCase, setRefRelevantCase] = useState(null);
  const [showRelevantCase, setShowRelevantCase] = useState(false);
  const [relevantCaseLoading, setRelevantCaseLoading] = useState(false);
  const [showSupremeCourtCases, setSupremeCourtCases] = useState(false);
  const [refSupremeCase, setRefSupremeCase] = useState(null);
  const [supremeCourtLoading, setSupremeCourtLoading] = useState(false);
  const [fileSubmitLoading, setFileSubmitLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const promptsArrSelector = useSelector((state) => state?.prompt?.prompts);
  const loadPromptHistory = useSelector((state) => state?.prompt?.loadHistory);
  const { prompt, status, response, error, relatedCases, plan } = useSelector(
    (state) => state.gpt
  );
  const loadUserSessions = useSelector((state) => state.prompt.loadUserSession);

  const { isAuthLoading } = useAuthState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const divRef = useRef(null);
  const hasFetchedRef = useRef(false);
  const onReloadRef = useRef(false);
  const onLoadUserSessionRef = useRef(false);

  useEffect(() => {
    if (loadUserSessions && !onLoadUserSessionRef.current) {
      dispatch(setLoadUserSessions());
      onLoadUserSessionRef.current = true;
    }
  }, [loadUserSessions]);

  useEffect(() => {
    if (
      promptsArrSelector.length === 0 &&
      !onReloadRef.current &&
      !isAuthLoading &&
      !loadPromptHistory
    ) {
      console.log("triggered - fetchSessionMessagesonReload");
      fetchSessionMessagesonReload();
      onReloadRef.current = true;
    }

    // Fetch on loadPromptHistory condition
    if (loadPromptHistory && !hasFetchedRef.current && !isAuthLoading) {
      console.log("triggered - fetchSessionMessages");
      hasFetchedRef.current = true;
      fetchSessionMessages();
    }
  }, [isAuthLoading, loadPromptHistory]);

  async function fetchSessionMessages() {
    console.log("triggerred");
    const res = await fetch(
      `${NODE_API_ENDPOINT}/gpt/session/${params.sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await res.json();
    dispatch(setPromptsArrAction(data.messages));
    dispatch(setPromptHistory());
    hasFetchedRef.current = false;
    getAiSuggestedQuestions();
    resetOnEveryContext();
  }

  async function fetchSessionMessagesonReload() {
    console.log("triggerred");
    const res = await fetch(
      `${NODE_API_ENDPOINT}/gpt/session/${params.sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await res.json();
    dispatch(setPromptsArrAction(data.messages));
    getAiSuggestedQuestions();
    resetOnEveryContext();
  }

  useEffect(() => {
    setPromptsArr(promptsArrSelector);
  }, [promptsArrSelector]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [
    promptsArr,
    aiSuggestedQuestions,
    relatedCases.cases,
    refRelevantCase,
    refSupremeCase,
  ]);

  useEffect(() => {
    const newSocket = new WebSocket(
      // "wss://20.198.24.104:8000/api/v1/gpt/generate"
      "wss://api.clawlaw.in:8000/api/v1/gpt/generate"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      if (promptsArrSelector.length > 0 && !promptsArrSelector[0].isDocument) {
        newSocket.send(
          JSON.stringify({
            prompt: promptsArrSelector[0].text,
            context: "",
          })
        );
      }
    };

    newSocket.onmessage = (event) => {
      const formattedData = event.data
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "");
      setMessage((prevMessages) => [...prevMessages, formattedData]);
    };

    newSocket.onclose = (event) => {
      console.log(event);
      console.log("Closed code:", event.code);
      console.log("Close reason:", event.reason);
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (e, message) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      // console.log(message);
      socket.send(JSON.stringify(message));
      // dispatch(setPromptLoading());
    }
  };

  function setMessagesArray(e) {
    e.preventDefault();
    dispatch(
      setPromptsArrAction([
        {
          text: inputText,
          isDocument: null,
          contextId: null,
          isUser: true,
          sessionId: params.sessionId,
        },
        {
          text: null,
          isDocument: null,
          contextId: null,
          isUser: false,
          sessionId: params.sessionId,
        },
      ])
    );
    setUserGptResponse(promptsArr.length, {
      text: inputText,
      isDocument: null,
      contextId: null,
      isUser: true,
      sessionId: params.sessionId,
    });
    resetOnEveryContext();
  }

  async function setUserGptResponse(index, message) {
    if (currentUser) {
      const res = await fetch(
        `${NODE_API_ENDPOINT}/gpt/session/appendMessage`,
        {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      console.log(promptsArr.length);
      console.log(index, resData);
      dispatch(setMessageIdPromptData({ index, data: resData.data.id }));
    }
  }

  useEffect(() => {
    if (message.length === 0) return;

    const typeText = () => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message[index]);
        setIndex((prev) => prev + 1);
        dispatch(setNewPromptData({ message: message[index] }));

        if (message[index] === "<EOS>") {
          console.log("Message is Finished");
          console.log(promptsArr.length - 1);
          setUserGptResponse(promptsArr.length - 1, {
            text: promptsArr[promptsArr.length - 1].text,
            isDocument: null,
            contextId: null,
            isUser: false,
            sessionId: params.sessionId,
          });
          getAiSuggestedQuestions();
          // setMessage("");
        }
      }
    };

    if (index < message.length) {
      const animationFrameId = requestAnimationFrame(typeText);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [index, message]);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedLanguage("");
    setUploadedFiles([]);
    setFileDialog(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleMenuOpen = (event) => {
    event.preventDefault();
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first file (if any)
    if (file) {
      setUploadedFiles([file]); // Update state with the single file
    }
  };

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      handleFileSubmit();
    }
  }, [uploadedFiles]);

  const handleFileSubmit = async () => {
    setFileSubmitLoading(true);
    const formData = new FormData();
    formData.append("file", uploadedFiles[0]);
    formData.append("language", selectedLanguage.toLowerCase());
    try {
      const response = await axios.post(
        `${NODE_API_ENDPOINT}/gpt/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        }
      );

      const fileData = response.data;

      dispatch(
        setPromptsArrAction([
          {
            text: fileData.data.fetchUploaded.document,
            isDocument: uploadedFiles[0].name,
            contextId: null,
            isUser: true,
            sessionId: params.sessionId,
          },
        ])
      );
      setUserGptResponse(promptsArr.length - 1, {
        text: fileData.data.fetchUploaded.document,
        isDocument: uploadedFiles[0].name,
        contextId: null,
        isUser: true,
        sessionId: params.sessionId,
      });
      resetOnEveryContext();
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setFileSubmitLoading(false);
    }
  };

  const getContext = () => {
    let context = "";
    if (
      promptsArr.length > 0 &&
      !promptsArr[promptsArr.length - 1].isDocument
    ) {
      context =
        promptsArr[promptsArr.length - 1].text +
        " " +
        promptsArr[promptsArr.length - 2].text;
    } else if (
      promptsArr.length > 0 &&
      promptsArr[promptsArr.length - 1].isDocument
    ) {
      context = promptsArr[promptsArr.length - 1].text;
    }
    return context;
  };

  const handleRegenerateResponse = async (index) => {
    setEditIndex(index);
    const reqQuery = promptsArr[index];
    const reqQueryIndex = promptsArr[index - 1];
    console.log(reqQueryIndex);

    try {
      setTextLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/regenerate-response`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: reqQueryIndex.text,
          sessionId: params.sessionId,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch suggested questions");
      }

      const data = await res.json();
      console.log(data);
      const newObj = {
        ...reqQuery,
        text: data.data.gptResponse.message
          .replaceAll("\\\\n\\\\n", "<br/>")
          .replaceAll("\\\\n", "<br/>")
          .replaceAll("\\n\\n", "<br/>")
          .replaceAll("\\n", "<br/>")
          .replaceAll("\n", "<br/>")
          .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
          .replaceAll("\\", "")
          .replaceAll('"', "")
          .replaceAll(":", " :")
          .replaceAll("#", ""),
      };
      dispatch(setDataUsingIndex({ index: index, text: newObj }));
      setTextLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setTextLoading(false);
    }
  };

  const handleTranslateClick = (event, index) => {
    console.log(index);
    event.stopPropagation();
    setAnchorElTranslate(event.currentTarget);
    setEditIndex(index);
  };

  const handleTranslateClose = () => {
    setAnchorElTranslate(null);
  };

  const translateOpen = Boolean(anchorElTranslate);
  const translateId = translateOpen ? "simple-popover" : undefined;

  const handleTranslatePrompt = async (language) => {
    setAnchorElTranslate(null);
    const reqQuery = promptsArr[editIndex];

    try {
      setTranslationLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/translate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: reqQuery.text,
          language: language.toLowerCase(),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to translate!");
      }

      const data = await res.json();
      console.log(data);
      const newObj = { ...reqQuery, text: data.data.translatedText.response };
      dispatch(setDataUsingIndex({ index: editIndex, text: newObj }));
      // let newArr = [...promptsArr];
      // newArr[index] = newObj;
      // setPromptsArr(newArr);
      setTranslationLoading(false);
    } catch (error) {
      console.log(error);
      setTranslationLoading(false);
    }
  };

  const handleAudioPlayerClick = (index) => {
    setEditIndex(index);
    setAnchorElAudio(true);
  };

  const getAiSuggestedQuestions = async () => {
    if (aiSuggestedQuestions.length > 0) return;
    try {
      setSuggestedQuestionsIsLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/suggested-questions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: promptsArr[promptsArr.length - 1].text,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch suggested questions");
      }

      const data = await res.json();
      // console.log(data);
      setAiSuggestedQuestions(data.data.questions);
      setSuggestedQuestionsIsLoading(false);
      return data.question;
    } catch (error) {
      console.log(error);
      setSuggestedQuestionsIsLoading(false);
    }
  };

  async function fetchRelatedCases(courtName) {
    setCasesLoading(true);
    setCaseCount(2);
    try {
      const res = await fetch(
        `${NODE_API_ENDPOINT}/gpt/case/related/${params.sessionId}`,
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
      setCasesLoading(false);
    }
  }

  const handleHighCourtChange = async (event) => {
    console.log(event.target.value);
    setcourtName(event.target.value);
    dispatch(setRelatedCases({}));

    await fetchRelatedCases(event.target.value);
  };

  const formatText = (text) => {
    return text
      .replace(/\\n\\n/g, "<br/><br/>")
      .replace(/\\n/g, "  <br/>")
      .replace(/\u20B9/g, "₹");
  };

  const md = markdownit({
    html: true,
    xhtmlOut: true,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    quotes: "“”‘’",
    highlight: function (/*str, lang*/) {
      return "";
    },
  });

  const handleShowRelevantAct = async () => {
    if (refRelevantCase) {
      return;
    }
    setRelevantCaseLoading(true);
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
          body: JSON.stringify({ sessionId: params.sessionId }),
        }
      );

      const response = await fetchData.json();

      console.log("");
      const responsetext = formatText(response.data.references);
      setRefRelevantCase(md.render(responsetext));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setRelevantCaseLoading(false);
    }
  };

  const handleShowSupremeCourtJudgements = async () => {
    if (refSupremeCase) {
      return;
    }
    setSupremeCourtLoading(true);
    setSupremeCourtCases(true);
    //api call
    try {
      const fetchData = await fetchWrapper.post(
        `${NODE_API_ENDPOINT}/gpt/session/judgement`,
        {
          body: JSON.stringify({ sessionId: params.sessionId }),
        }
      );

      const response = await fetchData.json();

      console.log(response.data.judgments);
      const responsetext = formatText(response.data.judgments);
      setRefSupremeCase(md.render(responsetext));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSupremeCourtLoading(false);
    }
  };

  const resetOnEveryContext = () => {
    setInputText("");
    setAiSuggestedQuestions([]);
    setShowCasesDialog(false);
    setcourtName("Supreme Court of India");
    dispatch(setRelatedCases({}));
    setRefRelevantCase(null);
    setRefSupremeCase(null);
    setShowRelevantCase(false);
    setSupremeCourtCases(false);
  };

  return (
    <>
      <div className="h-screen w-auto flex flex-col p-3 bg-[#0F0F0FCC]">
        <div className="ml-5 flex gap-2 items-start justify-start">
          <p className="text-3xl font-semibold m-0 max-w-fit text-[#018081]">
            LegalGPT
          </p>
          <p className="m-0 text-xs pt-1">by CLAW</p>
        </div>
        <br />
        {promptsArr.length > 0 ? (
          <div
            ref={divRef}
            className="h-[95%] overflow-auto flex flex-col gap-2"
          >
            {promptsArr.map((x, index) => (
              <div key={index}>
                <div className="flex items-center justify-end">
                  {!x.isUser ? (
                    <>
                      <IconButton
                        onClick={handleMenuOpen}
                        sx={{ color: "white" }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorElMenu}
                        keepMounted
                        open={Boolean(anchorElMenu)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem>Reply</MenuItem>
                      </Menu>
                    </>
                  ) : null}
                </div>
                {x.text && !x.isDocument ? (
                  <div className="w-full flex gap-1 items-center">
                    {x.isUser ? <AccountCircleIcon /> : null}
                    <div
                      className="w-full flex flex-col p-2 rounded-lg border-2"
                      style={{
                        background: x.isUser ? "transparent" : "#303030",
                        borderColor: x.isUser ? "transparent" : "#018081",
                      }}
                    >
                      {(textLoading || translationLoading) &&
                      editIndex == index ? (
                        <div className="h-full w-full p-3 flex flex-col gap-1">
                          <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-[60%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                          <div className="w-[40%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                        </div>
                      ) : (
                        <p
                          className="flex-1 m-0"
                          style={{
                            borderBottom: x.isUser
                              ? "0px"
                              : "1px solid rgb(204, 204, 204)",
                            paddingBottom: !x.isUser ? "8px" : "0px",
                          }}
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: x.text,
                          }}
                        >
                          {/* {x.text} */}
                        </p>
                      )}

                      {!x.isUser ? (
                        <div className="m-0 flex flex-col md:flex-row gap-3 justify-between items-center w-full py-2">
                          <div className="flex-1">
                            {promptsArr.length - 1 == index && !x.user ? (
                              <div className="flex gap-2">
                                <p
                                  onClick={() => {
                                    setShowCasesDialog(true);
                                    fetchRelatedCases("Supreme Court of India");
                                  }}
                                  style={{
                                    pointerEvents:
                                      relatedCases?.cases?.length > 0
                                        ? "none"
                                        : "auto",
                                  }}
                                  className="m-0 border-2 border-white text-white rounded-lg py-1 px-3 cursor-pointer max-w-[7.5rem] flex justify-center items-center bg-[#018081] hover:bg-opacity-75"
                                >
                                  {casesLoading ? (
                                    <CircularProgress
                                      size={15}
                                      sx={{ color: "white" }}
                                    />
                                  ) : (
                                    "Load Cases"
                                  )}
                                </p>
                                <p
                                  onClick={handleShowRelevantAct}
                                  className="m-0 border-2 border-white text-white max-w-[7rem] rounded-lg py-1 px-3 cursor-pointer flex justify-center items-center bg-[#018081] hover:bg-opacity-75"
                                >
                                  {relevantCaseLoading ? (
                                    <CircularProgress
                                      size={15}
                                      sx={{ color: "white" }}
                                    />
                                  ) : (
                                    "References"
                                  )}
                                </p>
                                <p
                                  onClick={handleShowSupremeCourtJudgements}
                                  className="m-0 border-2 border-white text-white max-w-[9rem] rounded-lg py-1 px-3 cursor-pointer flex justify-center items-center bg-[#018081] hover:bg-opacity-75"
                                >
                                  {supremeCourtLoading ? (
                                    <CircularProgress
                                      size={15}
                                      sx={{ color: "white" }}
                                    />
                                  ) : (
                                    "SC Judgement"
                                  )}
                                </p>
                              </div>
                            ) : null}
                          </div>
                          <div className="m-0 flex  items-center gap-3">
                            <div>
                              {textLoading && editIndex == index ? (
                                <div className="flex items-center gap-2">
                                  <CircularProgress size={15} color="inherit" />
                                  <p className="m-0 text-[#018081]">
                                    Regenerating Response...
                                  </p>
                                </div>
                              ) : (
                                <div
                                  className="flex items-center gap-1 cursor-pointer "
                                  onClick={() =>
                                    handleRegenerateResponse(index)
                                  }
                                >
                                  <img
                                    className="w-4 h-4"
                                    src={regenerateIcon}
                                  />
                                  <p className="m-0 hover:text-white">
                                    Regenerate
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              {translationLoading && editIndex == index ? (
                                <div className="flex items-center gap-2">
                                  <CircularProgress size={15} color="inherit" />
                                  <p className="m-0 text-[#018081]">
                                    Translating...
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <div
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() =>
                                      handleRegenerateResponse(index)
                                    }
                                  >
                                    <img
                                      className="w-4 h-4 rounded-none"
                                      src={translateIcon}
                                    />
                                    <p
                                      className="m-0 max-w-fit hover:text-white"
                                      onClick={(e) =>
                                        handleTranslateClick(e, index)
                                      }
                                    >
                                      Translate
                                    </p>
                                  </div>
                                  <Popover
                                    className="w-full h-2/3"
                                    id={translateId}
                                    open={translateOpen}
                                    anchorEl={anchorElTranslate}
                                    onClose={handleTranslateClose}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                  >
                                    {languageArr.sort().map((x, i) => (
                                      <p
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleTranslatePrompt(x);
                                        }}
                                        key={i}
                                        className="m-0 text-[#018081] py-1 px-4 cursor-pointer border-b border-[#018081]"
                                      >
                                        {x}
                                      </p>
                                    ))}
                                  </Popover>
                                </>
                              )}
                            </div>
                            <div>
                              {anchorElAudio && editIndex == index ? (
                                <AudioPlayer
                                  token={currentUser.jwt}
                                  text={promptsArr[index].text}
                                  setAnchorEl={setAnchorElAudio}
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  className="cursor-pointer"
                                  onClick={() => handleAudioPlayerClick(index)}
                                  fill="white"
                                >
                                  <path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : x.isDocument ? (
                  <div className="flex justify-between items-center bg-[#495057] w-full py-3 pr-3 rounded-lg border-2 border-[#018081]">
                    <div className="flex-1 flex gap-2 items-center pl-1">
                      <DescriptionIcon />
                      <p className="m-0">{x.isDocument}</p>
                    </div>
                    <div>
                      <p className="text-[#00CBCD] m-0">FILE UPLOADED</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full p-3 flex flex-col gap-1">
                    <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                    <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                    <div className="w-[60%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                    <div className="w-[40%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
            {suggestedQuestionsIsLoading ? (
              <div className="h-full w-full pt-2 flex flex-col gap-2">
                <p className="m-0">Generating AI Suggestions....</p>
                <div className="w-full h-5 bg-slate-600 animate-pulse  rounded"></div>
              </div>
            ) : (
              <>
                {aiSuggestedQuestions.length > 0 ? (
                  <>
                    <p className="m-0  text-[#018081] text-lg font-bold">
                      AI Suggested Questions
                    </p>
                    {aiSuggestedQuestions.map((x, index) => (
                      <p
                        onClick={() => setInputText(x)}
                        className="border-2 border-gray-400 rounded p-2 cursor-pointer m-0 w-full hover:border-white hover:text-white"
                        key={index}
                      >
                        {x}
                      </p>
                    ))}
                  </>
                ) : null}
              </>
            )}
            {showCasesDialog ? (
              <div className="border-2 border-[#018081] rounded bg-[#303030] flex flex-col gap-3 py-2">
                <div className="flex flex-col flex-wrap md:flex-row justify-between md:items-center">
                  <p className="font-bold m-0 px-3 text-xl text-white">
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
                {relatedCases?.cases?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      marginTop: 5,
                      padding: "0px 10px",
                    }}
                  >
                    <>
                      {relatedCases.cases
                        .slice(0, caseCount)
                        .map((relatedCase, index) => {
                          return (
                            <CasecardGpt
                              key={index}
                              name={relatedCase.Title}
                              caseId={relatedCase.case_id}
                              citations={relatedCase.num_cites}
                              date={relatedCase.Date}
                              court={relatedCase.court}
                              keyIndex={index}
                            />
                          );
                        })}
                      <div>
                        <p
                          onClick={() =>
                            setCaseCount((caseCount) => caseCount + 2)
                          }
                          className="m-0 border-2 border-white text-white rounded-lg py-1 px-3 cursor-pointer max-w-fit flex justify-center items-center"
                        >
                          Load More...
                        </p>
                      </div>
                    </>
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col gap-2 px-2">
                    <div className="w-full h-20 bg-slate-600 animate-pulse  rounded"></div>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2">
              {showRelevantCase ? (
                <div
                  class="backdropImg"
                  style={{
                    padding: "12px",
                    border: "2px solid white",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                  // className="m-2 p-3 border-2 border-white rounded bg-[#018081] flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold m-0 text-2xl text-white">
                      Reference to Relevant Cases
                    </p>
                  </div>
                  {refRelevantCase ? (
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: refRelevantCase,
                      }}
                    ></div>
                  ) : (
                    <div className="h-full w-full p-3 flex flex-col gap-1">
                      <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-[60%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-[40%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {showSupremeCourtCases ? (
                <div
                  class="backdropImg"
                  style={{
                    padding: "12px",
                    border: "2px solid white",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold m-0 text-2xl text-white">
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
                    <div className="h-full w-full p-3 flex flex-col gap-1">
                      <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-full h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-[60%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                      <div className="w-[40%] h-2 bg-slate-600 animate-pulse  rounded-full"></div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="h-[95%]  flex flex-col justify-center items-center">
            <CircularProgress size={100} sx={{ color: "white" }} />
          </div>
        )}
        <br />
        <form
          onSubmit={(e) => {
            sendMessage(e, {
              prompt: inputText,
              context: getContext(),
            });
            setMessagesArray(e);
          }}
          className="flex gap-2 w-full"
        >
          <input
            required
            placeholder="Add your query..."
            className="text-black flex-1 p-2 rounded-lg"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="button"
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            style={{
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              marginRight: "5px",
            }}
          >
            <FileUploadIcon
              style={{ color: "white", backgroundColor: "transparent" }}
            />
          </button>

          <Popover
            className="w-full"
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {!fileDialog ? (
              <div className="p-3 bg-[#C2FFFF] w-full border-4 border-[#018081]">
                <div className="flex w-full justify-between items-center gap-28">
                  <p className="m-0 text-[#018081] text-lg font-semibold">
                    Select Document Language
                  </p>
                  <Close
                    sx={{ color: "#018081" }}
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
                <div>
                  <TextField
                    label="Choose a Language"
                    select
                    fullWidth
                    margin="normal"
                    size="small"
                    value={selectedLanguage}
                    onChange={handleChange}
                  >
                    {multilingualSupportLanguages.sort().map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    disabled={selectedLanguage === ""}
                    onClick={() => setFileDialog(true)}
                    className="rounded-lg"
                    style={{
                      background: "linear-gradient(90deg,#018081,#001B1B)",
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#C2FFFF] w-full border-4 border-[#018081]">
                <div className="flex w-full justify-between items-center gap-28 pb-2">
                  <p className="m-0 text-[#018081] text-lg font-semibold">
                    Upload Document
                  </p>
                  <Close
                    sx={{ color: "#018081" }}
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
                {fileSubmitLoading ? (
                  <div className="w-full h-[150px] flex justify-center items-center">
                    <CircularProgress sx={{ color: "#018081" }} />
                  </div>
                ) : (
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="file-upload"
                      className="file-input"
                      // multiple
                      single
                      accept=".docx, .pdf,.txt"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                      <div className="flex w-full justify-center pb-2">
                        <img className="rounded-none" src={UploadIcon} />
                      </div>
                      <span className="text-[#018081]">
                        Click Here to Choose a File to Upload
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </Popover>
          <button
            disabled={inputText === ""}
            type="submit"
            className="rounded-lg"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default WebSocketComponent;
