import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import ClearIcon from "@mui/icons-material/Clear";
import { setToken } from "../../features/gpt/gptSlice";
import Styles from "../../components/CaseCard/index.module.css";
import { useDispatch } from "react-redux";
import { open } from "../../features/popup/popupSlice";
import markdownit from "markdown-it";

const courtIdMapping = {
  "Supreme Court of India": "1bgi-zbCWObiTNjkegNXryni4ZJzZyCFV",
  "Chattisgarh High Court": "10WjvWkkE5P9AZJTdBuK3rOB3FBfSuPON",
  "Sikkim High Court": "1LRcl09Lc2psq3kFjZ92oYEBV54Bgdr4q",
  "Uttarakhand High Court": "16ghA911ENkOJ5GDa-317ncVA_egwsy6J",
  "Calcutta High Court": "1CTxPb31Kvj-iyUxef5THaTL7pzJpXsE0",
  "Kerela High Court": "1ss5iK8rcrEzjWUjUl5Cg2qhKunTQX4II",
  "Karnataka High Court": "1k8EEGMnzCbdyTKsNVGxboa4wqRiW2SNi",
  "Jammu and Kashmir High Court": "15PrnIvUGB4OdKzSjvGtdpyVLLPlBEZ2M",
  "Jharkhand High Court": "1cKhGvZGPJpVVA5KFW1MH0PTgSTjlPV_5",
  "Delhi High Court": "1-4KMCL-J2HDD6RllAZbARzBJccxQPTYC",
  "Delhi District Court": "1PSrAbXpBsoUvqjV_ssoca3Xzzk71qP4a",
  "Madhya Pradesh High Court": "1exastQPw80VSb359G8xournBF1MPShdn",
  "Allahabad High Court": "1qpWWufkZ4ciCskmJ3xPHLe72Z8oKWjcO",
  "Gujarat High Court": "1NyOxx5lBZ-rFy3wtwdOlepTog668HUwJ",
};

export function CasecardGpt({ name, date, court, citations, caseId, query }) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [summery, setsummery] = useState("");
  const [openCase, setOpenCase] = useState(false);
  const [content, setContent] = useState("");
  const jwt = useSelector((state) => state.auth.user.jwt);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  // const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const handleSummary = async () => {
    if (summery) {
      return; // If content is already fetched, don't fetch again
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${NODE_API_ENDPOINT}/gpt/case/legalgptSummeryDetails`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folderId: courtIdMapping[court],
            caseId,
          }),
        }
      );
      const data = await response.json();

      setsummery(md.render(data.content));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSummaryToggle = async () => {
    setIsSummaryOpen(!isSummaryOpen);
    if (!isSummaryOpen) {
      handleSummary();
    }
  };
  // useEffect(() => {
  //   handleSummary();
  // }, []);

  async function handleOpen() {
    try {
      console.log(token);
      console.log(parseFloat(token?.used) + 1);

      if (
        token?.used?.caseSearchTokenUsed >=
          token?.total?.totalCaseSearchTokens ||
        parseFloat(token?.used?.caseSearchTokenUsed) + 1 >
          token?.total?.totalCaseSearchTokens
      ) {
        console.log("token exipred");
        dispatch(open());
        return;
      }
      setLoading(true);
      setOpenCase(true);

      const response = await fetch(
        `${NODE_API_ENDPOINT}/gpt/case/${courtIdMapping[court]}/${caseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      var parsed = await response.json();
      //   console.log(parsed.data.token);

      setContent(parsed);
      dispatch(setToken({ token: parsed.data.token }));
      //   console.log(token);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => setOpenCase(false);

  return (
    <div
      className={Styles.backdrop}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
        padding: 16,
        backgroundColor: "#008080",
        borderRadius: 10,
      }}
    >
      {/* <div className="flex justify-between gap-3"> */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700 }}>{name}</h2>
        <div style={{ fontSize: 13, color: "#DBD8D8" }}>
          <span>{date}</span>,<span>{" " + court}</span>
        </div>
        <p style={{ fontSize: 13, color: "#DBD8D8", margin: 0 }}>
          Number of citations- {citations}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleOpen}
          style={{
            border: "none",
            padding: "10px 12px",
            minWidth: "fit-content",
            backgroundColor: "#008080",
            borderRadius: 5,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            color: "white",
            border: "1px solid white",
            backgroundImage: "none",
          }}
        >
          View document
        </button>
        <button
          onClick={handleSummaryToggle}
          style={{
            border: "none",
            padding: "10px 12px",
            minWidth: "fit-content",
            backgroundColor: "#008080",
            borderRadius: 5,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            color: "white",
            border: "1px solid white",
            backgroundImage: "none",
            cursor: "pointer",
          }}
        >
          {isSummaryOpen ? "Hide summary" : "View summary"}
        </button>
      </div>
      {/* </div> */}
      <div>
        {isSummaryOpen && (
          <>
            {isLoading ? (
              <>
                <CircularProgress style={{ color: "white" }} />
              </>
            ) : (
              <>
                <hr />
                <p>Here is the summary content.</p>
                <p
                  style={{ color: "white" }}
                  dangerouslySetInnerHTML={{ __html: summery }}
                ></p>
              </>
            )}
          </>
        )}
      </div>

      <Modal
        open={openCase}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
      >
        <div
          className={Styles.scrollable}
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "90%",
            color: "black",
            borderRadius: 10,
            overflowY: "scroll",
            padding: 10,
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <div style={{ position: "sticky", top: 0, display: "flex" }}>
            <div style={{ flex: 1 }} />
            <button
              onClick={handleClose}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <ClearIcon style={{ fontSize: 30, color: "black" }} />
            </button>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress style={{ color: "black" }} />
            </div>
          ) : (
            <div
              style={{
                whiteSpace: "pre-line",
                alignItems: "center",
                width: "100%",
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "serif",
                border: "1px solid black",
                padding: 10,
              }}
            >
              {Object.keys(content?.data?.fetchedData || {}).map((key) => (
                <div key={key}>
                  <p style={{ color: "black" }}>
                    {content?.data?.fetchedData[key]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
