import { faUser } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Prompt.module.css";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";
import personIcon from "../../assets/images/Vector.png";
import regenerateIcon from "../../assets/images/regenerate.png";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import toast from "react-hot-toast";
import { CircularProgress, Divider, Modal, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import AudioPlayer from "./AudioPlay1";
import translateIcon from "../../assets/icons/translate.png";

const languageArr = [
  // "English",
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

export function Prompt({
  messageId,
  isUser,
  text,
  primaryColor,
  messageIndex,
  promptsArr,
  sessionId,
  setPrompts,
}) {
  const currentUser = useSelector((state) => state.auth.user);

  const highlighted = !isUser;
  const [promptText, setPromptText] = useState("");
  const [likeButton, setLikeButton] = useState("");
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedbackType, setFeedbackType] = useState("response");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatingLoading, setTranslationLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const [anchorElTranslate, setAnchorElTranslate] = useState(false);

  const handleAudioPlayerClick = () => {
    setAnchorEl(true);
  };

  const handleFeedback = (type) => {
    if (type === "like") {
      setLikeButton("like");
    } else {
      setLikeButton("dislike");
    }
    setFeedbackDialog(true);
  };

  const handleFeedbackSubmit = async () => {
    const reqObj = {
      messageId,
      impression: likeButton === "like" ? "Positive" : "Negative",
      feedbackType,
      feedbackMessage,
    };
    try {
      // setIsLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/feedback`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          impression: likeButton === "like" ? "Positive" : "Negative",
          feedbackType,
          feedbackMessage,
        }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      console.log(data);
      setFeedbackDialog(false);
      setFeedbackMessage("");
      toast.success("Thankyou for your valuable feedback !!");
      // return data.question;
    } catch (error) {
      console.log(error);
      toast.error(error.message);

      setFeedbackDialog(false);
      setFeedbackMessage("");
    }
  };

  const handleRegenerateResponse = async () => {
    // console.log(promptsArr);
    const reqQuery = promptsArr[messageIndex - 1];

    try {
      setIsLoading(true);
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/regenerate-response`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: reqQuery.text, sessionId: sessionId }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch suggested questions");
      }

      const data = await res.json();
      console.log(data);
      const newObj = {
        id: data.data.gptResponse.messageId,
        text: data.data.gptResponse.message,
        isUser: false,
      };
      promptsArr[promptsArr.length - 1] = newObj;
      setPrompts(promptsArr);
      setPromptText(data.data.gptResponse.message);
      setIsLoading(false);
      // return data.question;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleTranslatePrompt = async (language) => {
    setAnchorElTranslate(null);
    const reqQuery = promptsArr[promptsArr.length - 1];
    console.log(reqQuery);

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
      const newObj = {
        id: reqQuery.id,
        text: data.data.translatedText.response,
        isUser: false,
      };
      promptsArr[promptsArr.length - 1] = newObj;
      setPrompts(promptsArr);
      setPromptText(data.data.translatedText.response);
      setTranslationLoading(false);
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
      setTranslationLoading(false);
    }
  };

  useEffect(() => {
    setPromptText(text);
  }, [text]);

  const handleTranslateClick = (event) => {
    setAnchorElTranslate(event.currentTarget);
  };

  const handleTranslateClose = () => {
    setAnchorElTranslate(null);
  };

  const translateOpen = Boolean(anchorElTranslate);
  const translateId = translateOpen ? "simple-popover" : undefined;

  return (
    <>
      {!isUser && (
        <div className="w-full flex justify-end px-3 gap-3">
          <svg
            onClick={() => handleFeedback("like")}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={likeButton === "like" ? "skyblue" : "white"}
            viewBox="0 0 24 24"
          >
            <path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z" />
          </svg>
          <svg
            onClick={() => handleFeedback("dislike")}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={likeButton === "dislike" ? "red" : "white"}
            viewBox="0 0 24 24"
          >
            <path d="M5 14h-5v-12h5v12zm18.875-4.809c0-.646-.555-1.32-1.688-1.41-.695-.055-.868-.623-.031-.812.701-.159 1.098-.652 1.098-1.181 0-.629-.559-1.309-1.826-1.543-.766-.141-.842-.891-.031-.953.688-.053.96-.291.96-.626-.001-.931-1.654-2.666-4.852-2.666-4.16 0-6.123 2.067-10.505 2.768v10.878c2.375.869 4.466 2.644 5.688 6.886.478 1.661.781 3.468 2.374 3.468 2.375 0 2.594-5.125 1.688-8.781 1.312-.688 3.751-.936 4.979-.885 1.771.072 2.271-.818 2.271-1.49 0-1.011-.833-1.35-1.354-1.51-.609-.188-.889-.807-.031-.922.836-.112 1.26-.656 1.26-1.221z" />
          </svg>
        </div>
      )}
      <div
        className={Styles.container}
        style={
          highlighted
            ? {
                backgroundColor: "#303030",
                border: "2px solid #018081",
                margin: "15px",
                padding: "10px",
              }
            : { padding: "5px 10px" }
        }
      >
        <div className="flex items-start gap-2">
          <div className="flex items-center">
            {isUser ? <img className="w-7 h-[27px]" src={personIcon} /> : ""}
          </div>
          <div className={Styles.promptText}>
            {!isLoading || !translatingLoading ? (
              <p>{promptText}</p>
            ) : (
              <div className="h-full w-full p-3 flex flex-col gap-2">
                <div className="w-full h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-full h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-[60%] h-3 bg-slate-600 animate-pulse  rounded-full"></div>
                <div className="w-[40%] h-3 bg-slate-600 animate-pulse  rounded-full"></div>
              </div>
            )}
            {!isUser && promptsArr.length - 1 === messageIndex ? (
              <div className="flex justify-end items-center gap-3">
                <div>
                  {isLoading ? (
                    <div className="flex justify-end cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CircularProgress size={15} color="inherit" />
                        <p className="m-0 text-[#018081]">
                          Regenerating Response...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={handleRegenerateResponse}
                      className="flex justify-end cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img className="w-5 h-5" src={regenerateIcon} />
                        <p className="m-0">Regenerate</p>
                      </div>
                    </div>
                  )}
                </div>
                {translatingLoading ? (
                  <div className="flex justify-end cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CircularProgress size={15} color="inherit" />
                      <p className="m-0 text-[#018081]">Translating...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={handleTranslateClick}
                    >
                      <img
                        className="w-4 h-4 rounded-none"
                        src={translateIcon}
                      />
                      <p className="m-0">Translate</p>
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
                      {languageArr.map((x, index) => (
                        <p
                          onClick={() => handleTranslatePrompt(x)}
                          key={index}
                          className="m-0 text-[#018081] py-1 px-4 cursor-pointer border-b border-[#018081]"
                        >
                          {x}
                        </p>
                      ))}
                    </Popover>
                  </>
                )}
                <div>
                  {!anchorEl ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      viewBox="0 0 24 24"
                      className="cursor-pointer"
                      onClick={handleAudioPlayerClick}
                      fill="white"
                    >
                      <path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z" />
                    </svg>
                  ) : (
                    <AudioPlayer
                      token={currentUser.jwt}
                      text={promptText}
                      setAnchorEl={setAnchorEl}
                    />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        open={feedbackDialog}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "100vh",
        }}
        // onClose={() => {
        //   setFeedbackDialog(false);
        // }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-[#C7C7C7] w-4/6 rounded p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="m-0 text-[#018081] text-2xl font-bold">
              Feedback for LegalGPT
            </p>
            <Close
              onClick={() => {
                setFeedbackDialog(false);
                setFeedbackMessage("");
                setLikeButton("");
              }}
              sx={{ color: "#018081", cursor: "pointer" }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-1">
              <input
                type="radio"
                value="response"
                checked={feedbackType === "response"}
                onChange={(e) => setFeedbackType(e.target.value)}
                className=""
              />
              <p className="m-0 text-black">Response Generated</p>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                value="reference"
                checked={feedbackType === "reference"}
                onChange={(e) => setFeedbackType(e.target.value)}
                className=""
              />
              <p className="m-0 text-black">References</p>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                value="judgement"
                checked={feedbackType === "judgement"}
                onChange={(e) => setFeedbackType(e.target.value)}
                className=""
              />
              <p className="m-0 text-black">Judgement</p>
            </div>
          </div>
          <textarea
            required
            className="text-xs w-full rounded p-2 min-h-40 max-h-60 text-black"
            placeholder="Please provide your valuable feedback for the segment you choose above"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <button onClick={handleFeedbackSubmit} className="rounded">
              Submit Feedback
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
