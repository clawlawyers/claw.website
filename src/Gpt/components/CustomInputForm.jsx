import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Styles from "./CustomInputForm.module.css";
import { close, open } from "../../features/popup/popupSlice";
import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";

export default function CustomInputForm({
  onSubmit,
  isLoading = false,
  isError = false,
  containerStyles,
  primaryColor,
}) {
  const dispatch = useDispatch();

  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);

  const handlePopupOpen = useCallback(() => {
    dispatch(open());
  }, []);
  const handlePopupClose = useCallback(() => dispatch(close()), []);

  const [query, setQuery] = useState("");

  function onFormSubmission(e) {
    e.preventDefault();
    if (plan[0]?.plan?.legalGptAccess) {
      e.query = query;
      setQuery("");
      onSubmit(e);
      return;
    } else {
      handlePopupOpen();
    }
  }

  return (
    <div className={Styles.container} style={containerStyles}>
      <form
        onSubmit={onFormSubmission}
        // onSubmit={onFormSubmission}
        style={{
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255,255,255,0.05)",
          padding: 5,
          display: "flex",
        }}
      >
        <input
          type="text"
          disabled={isLoading || isError}
          placeholder="Type Your Legal Queries..."
          style={{
            flex: 1,
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
          }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button
          disabled={isLoading || isError || query === ""}
          type="submit"
          style={{
            border: "none",
            backgroundColor: primaryColor,
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
          }}
        >
          <SendIcon
            style={{ color: "white", backgroundColor: "transparent" }}
          />
        </button>
      </form>

      {/* <Modal open={isOpen} onClose={handlePopupClose}>
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "black",
            borderRadius: 10,
            overflowY: "scroll",
            padding: 10,
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handlePopupClose}
              style={{
                border: "none",
                backgroundColor: "inherit",
                backgroundImage: "none",
              }}
            >
              <ClearIcon style={{ fontSize: 30, color: "black" }} />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              padding: 50,
            }}
          >
            <LockIcon style={{ fontSize: 80, color: "black" }} />
            <h3 style={{ fontSize: 28, fontWeight: 500 }}>Upgrade Now</h3>
            <div style={{ display: "flex", gap: 5 }}>
              <button
                className={Styles.backdropImg}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                  padding: 10,
                }}
              >
                <Link
                  className={Styles.linkImg}
                  to="/pricing"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    width: "fit-content",
                    border: "none",
                  }}
                >
                  Buy Credits
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
