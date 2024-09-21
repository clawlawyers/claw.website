import { faUser } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Prompt.module.css";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";
import personIcon from "../../assets/images/Vector.png";
import regenerateIcon from "../../assets/images/regenerate.png";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Modal } from "@mui/material";

export function Prompt({
  messageId,
  isUser,
  text,
  primaryColor,
  messageIndex,
  promptsArr,
}) {
  const highlighted = !isUser;
  const [likeButton, setLikeButton] = useState("");
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedbackType, setFeedbackType] = useState("response");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFeedback = (type) => {
    if (type === "like") {
      setLikeButton("like");
    } else {
      setLikeButton("dislike");
    }
    setFeedbackDialog(true);
  };

  const handleFeedbackSubmit = () => {
    const reqObj = {
      messageId,
      impression: likeButton === "like" ? "Positive" : "Negative",
      feedbackType,
      feedbackMessage,
    };
    console.log(reqObj);
    setFeedbackDialog(false);
    setFeedbackMessage("");
    toast.success("Thankyou for your valuable feedback !!");
  };

  const handleRegenerateResponse = () => {
    // console.log(promptsArr);
    const reqQuery = promptsArr[messageIndex - 1];
    console.log({
      messageId,
      text: reqQuery.text,
    });
  };

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
            <p>{text}</p>
            {!isUser ? (
              <div
                onClick={handleRegenerateResponse}
                className="flex justify-end cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img className="w-5 h-5" src={regenerateIcon} />
                  <p className="m-0">Regenerate</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        open={feedbackDialog}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          <div className="flex gap-3">
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
            className="text-xs w-full rounded p-2 h-40 text-black"
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
