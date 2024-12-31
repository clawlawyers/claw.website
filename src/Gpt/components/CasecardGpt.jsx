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
import { activePlanFeatures } from "../../utils/checkActivePlanFeatures";

const courtIdMapping = {
  "Supreme Court of India": "1bgi-zbCWObiTNjkegNXryni4ZJzZyCFV ",
  "Chattisgarh High Court": "10WjvWkkE5P9AZJTdBuK3rOB3FBfSuPON",
  "Sikkim High Court": "1LRcl09Lc2psq3kFjZ92oYEBV54Bgdr4q",
  "Uttarakhand High Court": "16ghA911ENkOJ5GDa-317ncVA_egwsy6J",
  "Calcutta High Court": "1CTxPb31Kvj-iyUxef5THaTL7pzJpXsE0",
  "Kerela High Court": "1ss5iK8rcrEzjWUjUl5Cg2qhKunTQX4II",
  "Karnataka High Court":
    "1k8EEGMnzCbdyTKsNVGxboa4wqRiW2SNi, 12yzXXlf3hAxUAp1fmYTKCQrBV4O2TqwB, 1giA5ZiRlujgv1KwAEqBtH7-0wUi2I0qQ",
  "Jammu and Kashmir High Court": "15PrnIvUGB4OdKzSjvGtdpyVLLPlBEZ2M",
  "Jharkhand High Court": "1cKhGvZGPJpVVA5KFW1MH0PTgSTjlPV_5",
  "Delhi High Court": "1-4KMCL-J2HDD6RllAZbARzBJccxQPTYC",
  "Delhi District Court": "1PSrAbXpBsoUvqjV_ssoca3Xzzk71qP4a",
  "Madhya Pradesh High Court": "1exastQPw80VSb359G8xournBF1MPShdn",
  "Allahabad High Court":
    "1qpWWufkZ4ciCskmJ3xPHLe72Z8oKWjcO, 1--Ae2LBLKKeAJQ66PSXWwPqThK37csOk",
  "Gujarat High Court":
    "1NyOxx5lBZ-rFy3wtwdOlepTog668HUwJ, 1Hn_UM2BNWdJz_xHDeQox_3V8UE3HU89s",
  "Rajasthan High Court": "153TCPW0SuDtXQzlgLUtqES3uwVUkaMtu",
};

const newCourtIdMapping = {
  "Supreme Court of India": "1xe5a_r6_5bm9QO3_znBo9Y5ly7xpNOdl",
  "Chattisgarh High Court": "1e7GbahAfohsiF7w1_nCKWc7gr69ctOKO",
  "Sikkim High Court": "1BPtm3lqfX-PCErzoNByDwH0xlHpBKHtG",
  "Uttarakhand High Court": "1Cfd6hntom_pLJMv4_GHKec0oZAe2DIGu",
  "Calcutta High Court": "13kZvkMfQUqqE4TJHk1zT0R9EJ4vsm7Y_",
  "Kerela High Court": "18IEun-9TPt0tywiGmuKheHWmdkJ6N7PC",
  "Karnataka High Court": "1b3C4lv_sASf7Et4wS2me_dSp1T08NN-e",
  "Jammu and Kashmir High Court": "1xroQ7bjQPDiTpPWfAi5YDbMeM1MPlNOH",

  "Jharkhand High Court": "1iQOmzXhtTPa2G7C-pGwcVorkrUFBATTh",
  "Delhi High Court": "1uLtctLYbGYy26A3KbUs8Wh2SwMq6WbpF",
  "Delhi District Court": "1NCDpBZGjKIGEYaq-7JPX2rTNDwi48YBv",

  "Madhya Pradesh High Court": "1qFppmDox-fKOcPFW4FGedfCsIsOWUF8i",

  "Allahabad High Court": "1e_EdyqEQkCEW3pXFEo9eFweVGYoiwQRW",
  "Gujarat High Court": "1GWbg3GnvbseAGRfCvQt6ImhXgsg4ZfXl",
  "Rajasthan High Court": "18VP7y7NKx8jwSq87T2iSUEh4KnDyImOX",
};

export function CasecardGpt({
  name,
  date,
  court,
  citations,
  caseId,
  keyIndex,
}) {
  // console.log(date);
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
  // const { token } = useSelector((state) => state.gpt);
  const { plan } = useSelector((state) => state.gpt);

  const dispatch = useDispatch();

  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [activePlan, setActivePlan] = useState([]);

  const handlePopupOpen = useCallback(() => dispatch(open()), []);

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "AISummerizer"));
    }
  }, [plan]);

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
            folderId:
              new Date(date) < new Date("16-July-2024")
                ? courtIdMapping[court]
                : newCourtIdMapping[court],
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
      // console.log(token);
      // console.log(parseFloat(token?.used) + 1);

      // if (
      //   token?.used?.caseSearchTokenUsed >=
      //     token?.total?.totalCaseSearchTokens ||
      //   parseFloat(token?.used?.caseSearchTokenUsed) + 1 >
      //     token?.total?.totalCaseSearchTokens
      // ) {
      //   console.log("token exipred");
      //   dispatch(open());
      //   return;
      // }
      setLoading(true);
      setOpenCase(true);

      const mapping =
        new Date(date) < new Date("16-July-2024")
          ? courtIdMapping[court]
          : newCourtIdMapping[court];

      const response = await fetch(
        `${NODE_API_ENDPOINT}/gpt/case/${mapping}/${caseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      var parsed = await response.json();
      console.log(parsed);

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
      key={keyIndex}
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
      }}>
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
      <div className="flex flex-col md:flex-row gap-2">
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
          }}>
          View document
        </button>
        <button
          onClick={
            activePlan[0]?.plan?.AISummerizer
              ? handleSummaryToggle
              : handlePopupOpen
          }
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
          }}>
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
                  dangerouslySetInnerHTML={{ __html: summery }}></p>
              </>
            )}
          </>
        )}
      </div>

      <Modal
        open={openCase}
        onClose={handleClose}
        aria-labelledby="child-modal-title">
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
            // overflowY: "scroll",
            padding: 10,
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              display: "flex",
              background: "white",
            }}>
            <div style={{ flex: 1 }} />
            <button
              onClick={handleClose}
              style={{ border: "none", backgroundColor: "transparent" }}>
              <ClearIcon style={{ fontSize: 30, color: "black" }} />
            </button>
          </div>
          <div className="h-[90%] overflow-auto border border-black p-3">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
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
                }}>
                {Object.keys(content?.data?.fetchedData || {}).map((key) => {
                  function unicodeToChar(unicodeStr) {
                    return unicodeStr.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
                      return String.fromCharCode(
                        parseInt(match.replace("\\u", ""), 16)
                      );
                    });
                  }

                  let unicodeString = "\\u2026 \\u201D \\u201C";
                  let data = unicodeToChar(content?.data?.fetchedData[key]);

                  return (
                    <div key={key}>
                      <p
                        style={{ color: "black" }}
                        dangerouslySetInnerHTML={{ __html: data }}></p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
