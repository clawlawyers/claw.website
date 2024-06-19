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
};

export function CasecardGpt({ name, date, court, citations, caseId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [summery, setsummery] = useState("");
  const [openCase, setOpenCase] = useState(false);
  const [content, setContent] = useState("");
  const jwt = useSelector((state) => state.auth.user.jwt);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  async function handleOpen() {
    try {
      //   console.log(token);
      if (token?.used >= token?.total) {
        handlePopupOpen();
        // console.log("token exipred");
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
      const parsed = await response.json();
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
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 23, fontWeight: 700 }}>{name}</h2>
        <div style={{ fontSize: 13, color: "#DBD8D8" }}>
          <span>{date}</span>,<span>{" " + court}</span>
        </div>
        <p style={{ fontSize: 13, color: "#DBD8D8", margin: 0 }}>
          Number of citations- {citations}
        </p>
      </div>

      <button
        onClick={handleOpen}
        style={{
          border: "none",
          padding: "10px 12px",
          minWidth: "fit-content",
          backgroundColor: "white",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
          color: "black",
          backgroundImage: "none",
        }}
      >
        View document
      </button>

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
