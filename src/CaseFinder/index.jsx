import React, { useState, useCallback, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useSearchParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, FormHelperText, InputLabel, Modal, Chip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";
import { setCart } from "../features/cart/cartSlice";
import "../Gpt/LegalGPT.module.css";
import Sidebar from "./Sidebar";
import { CaseCard } from "../components/CaseCard";
import Styles from "./index.module.css";
import { SearchOutlined } from "@mui/icons-material";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { setPlan, setToken } from "../features/gpt/gptSlice";
import moment from "moment";
import { close, open } from "../features/popup/popupSlice";
import bgimage from "../assets/images/button-gradient.png";

export default function CaseFinder({
  keyword = "Legal",
  primaryColor = "#008080",
  model = "legalGPT",
}) {
  const [courtName, setCourtName] = useState("Supreme Court of India");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment("18-sep-01"));
  const [endDate, setEndDate] = useState(moment("19-sep-20"));
  const [result, setResult] = useState();
  const [search] = useSearchParams();
  const { messageId, cases } = useSelector((state) => state.gpt.relatedCases);
  const currentUser = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.open);
  const handlePopupClose = useCallback(() => dispatch(close()), [dispatch]);
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const [selectedCourts, setSelectedCourts] = useState([]);

  useEffect(() => {
    async function fetchGptUser() {
      try {
        const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
        });
        const parsed = await res.json();

        dispatch(setPlan({ plan: parsed.data.plan }));
        dispatch(setToken({ token: parsed.data.token }));
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUser) fetchGptUser();
  }, [currentUser]);

  const handleCourtChange = (event) => {
    const {
      target: { value },
    } = event;
    // Update the state with the selected courts, allowing deselection

    setSelectedCourts(typeof value === "string" ? value.split(",") : value);
  };

  async function handleCaseSearch(e) {
    if (selectedCourts.length === 0) {
      alert("Please select at least one court.");
      return;
    }
    const courtsString = selectedCourts.join(",");
    try {
      e.preventDefault();
      setLoading(true);
      if (
        token?.used >= token?.total ||
        parseFloat(token?.used) + 0.2 > token?.total
      ) {
        dispatch(open());
        throw new Error(
          "Not enough tokens, please upgrade or try again later!"
        );
      }

      const response = await fetch(`${NODE_API_ENDPOINT}/gpt/case/search`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startDate.format("YY-MMM-DD"),
          endDate: endDate.format("YY-MMM-DD"),
          query,
          courtName: courtsString,
        }),
      });
      const parsed = await response.json();
      setResult(parsed.data.result);
      dispatch(setToken({ token: parsed.data.token }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const topuphandler = () => {
    dispatch(
      setCart({
        request: 5,
        session: 1,
        total: 25,
        plan: "LIFETIME",
        type: "TOPUP",
      })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={`${Styles.container} `}>
        <div className={`${Styles.sidebarContainer}`}>
          <Sidebar
            keyword={keyword}
            primaryColor={primaryColor}
            model={model}
          />
        </div>

        <div
          className={`${
            collapsed ? Styles.contentContainer : Styles.contentContainer1
          } `}
        >
          <Modal open={isOpen} onClose={handlePopupClose}>
            <div className={Styles.modalContent}>
              <div className={Styles.modalHeader}>
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
              <div className={Styles.modalBody}>
                <LockIcon style={{ fontSize: 80, color: primaryColor }} />
                <h3 style={{ fontSize: 28, fontWeight: 500 }}>Upgrade Now</h3>
                <div className={Styles.modalActions}>
                  <StudentReferralModal />
                  <button
                    onClick={topuphandler}
                    className="backdropImg"
                    style={{
                      border: "none",
                      backgroundColor: "rgb(0, 128, 128)",
                      borderRadius: 15,
                      padding: 10,
                    }}
                  >
                    <Link
                      className="linkImg"
                      to="/paymentgateway"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        width: "fit-content",
                        border: "none",
                      }}
                    >
                      Top Up 25 Rs
                    </Link>
                  </button>
                  <button
                    className="backdropImg"
                    style={{
                      border: "none",
                      backgroundColor: "rgb(0, 128, 128)",
                      borderRadius: 15,
                      padding: 10,
                    }}
                  >
                    <Link
                      className="linkImg"
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
          </Modal>
          <div className={Styles.inputGrid}>
            <Box>
              <div>Court:</div>
              <FormControl fullWidth error={selectedCourts.length === 0}>
                {selectedCourts.length !== 0 ? null : (
                  <InputLabel
                    id="court-selector-label"
                    style={{ color: "black" }}
                  >
                    Select a court....
                  </InputLabel>
                )}
                <Select
                  labelId="court-selector-label"
                  onChange={handleCourtChange}
                  value={selectedCourts}
                  // onChange={(e) => setCourtName(e.target.value)}
                  // value={courtName}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    maxWidth: "450px",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                  multiple
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        maxHeight: 80,
                        overflow: "auto",
                      }}
                    >
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ backgroundColor: "#e0f7fa" }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem disabled value="">
                    <em>Select a court</em>
                  </MenuItem>
                  <MenuItem value="Supreme Court of India">
                    Supreme Court of India
                  </MenuItem>
                  <MenuItem value="Chattisgarh High Court">
                    Chattisgarh High Court
                  </MenuItem>
                  <MenuItem value="Sikkim High Court">
                    Sikkim High Court
                  </MenuItem>
                  <MenuItem value="Uttarakhand High Court">
                    Uttarakhand High Court
                  </MenuItem>
                  <MenuItem value="Calcutta High Court">
                    Calcutta High Court
                  </MenuItem>
                  {/* <MenuItem value="Kerela High Court">
                    Kerela High Court
                  </MenuItem>
                  <MenuItem value="Karnataka High Court">
                    Karnataka High Court
                  </MenuItem> */}
                  <MenuItem value="Jammu and Kashmir High Court">
                    Jammu and Kashmir High Court
                  </MenuItem>
                  {/* <MenuItem value="Jharkhand High Court">
                    Jharkhand High Court
                  </MenuItem>
                  <MenuItem value="Delhi High Court">Delhi High Court</MenuItem>
                  <MenuItem value="Delhi District Court">
                    Delhi District Court
                  </MenuItem>
                  <MenuItem value="Madhya Pradesh High Court">
                    Madhya Pradesh High Court
                  </MenuItem>
                  <MenuItem value="Allahabad High Court">
                    Allahabad High Court
                  </MenuItem>
                  <MenuItem value="Gujarat High Court">
                    Gujarat High Court
                  </MenuItem> */}
                </Select>
                {selectedCourts.length === 0 && (
                  <FormHelperText>
                    Please select at least one court.
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <div style={{ display: "flex", gap: 10 }}>
              <div>
                <div>From:</div>
                <DatePicker
                  value={startDate}
                  onChange={(newVal) => setStartDate(newVal)}
                  sx={{ backgroundColor: "white" }}
                />
              </div>
              <div>
                <div>To:</div>
                <DatePicker
                  value={endDate}
                  onChange={(newVal) => setEndDate(newVal)}
                  sx={{ backgroundColor: "white" }}
                />
              </div>
            </div>
          </div>
          <form
            onSubmit={handleCaseSearch}
            style={{
              marginTop: 20,
              marginBottom: 25,
              display: "flex",
              backgroundColor: "white",
              padding: 16,
              borderRadius: 10,
            }}
          >
            <SearchOutlined
              style={{ color: "#777", marginRight: "10px", marginTop: "7px" }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                fontSize: 16,
                outline: "none",
                border: "none",
              }}
              placeholder="Enter Prompt Here ..."
            />
            <button
              type="submit"
              className={Styles.bgbutton}
              style={{
                backgroundColor: primaryColor,
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: "8px 16px",
                cursor: "pointer",
                marginLeft: 10,
              }}
            >
              Search
            </button>
          </form>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ color: "white" }} />
              </div>
            ) : (
              <>
                {result
                  ? result.map((relatedCase) => {
                      return (
                        <CaseCard
                          caseId={relatedCase.case_id}
                          name={relatedCase.Title}
                          date={relatedCase.Date}
                          citations={relatedCase.num_cites}
                          court={relatedCase.court}
                          key={relatedCase.id}
                          query={query}
                        />
                      );
                    })
                  : search.get("id") === messageId &&
                    cases.map((relatedCase) => {
                      return (
                        <CaseCard
                          caseId={relatedCase.case_id}
                          name={relatedCase.Title}
                          citations={relatedCase.num_cites}
                          date={relatedCase.Date}
                          court={relatedCase.court}
                          key={relatedCase.id}
                          query={query}
                        />
                      );
                    })}
              </>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

function StudentReferralModal() {
  const [open, setOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const jwt = useSelector((state) => state.auth.user.jwt);
  const dispatch = useDispatch();

  async function handleRedeem(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${NODE_API_ENDPOINT}/gpt/referralCode/redeem`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode }),
      });
      const { data } = await res.json();
      dispatch(setPlan({ plan: data.plan }));
      dispatch(setToken({ token: data.token }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setReferralCode("");
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          if (!loading) setOpen(false);
        }}
      >
        <div
          style={{
            backgroundColor: "#1e1e1e",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "white",
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
              disabled={loading}
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                backgroundColor: "inherit",
                backgroundImage: "none",
              }}
            >
              <ClearIcon style={{ fontSize: 30, color: "white" }} />
            </button>
          </div>
          <form
            onSubmit={handleRedeem}
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 15,
              alignItems: "center",
            }}
          >
            <h3>Redeem Referral Code</h3>
            <input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Referral Code"
              style={{
                width: "100%",
                outline: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "#2d2d2d",
                color: "white",
              }}
            />
            <button
              className="backdropImg"
              disabled={loading}
              type="submit"
              style={{
                borderRadius: 15,
                color: "white",
                textDecoration: "none",
                padding: 10,
                width: "fit-content",
                border: "none",
              }}
            >
              {loading ? (
                <CircularProgress style={{ color: "white", padding: 10 }} />
              ) : (
                "Redeem"
              )}
            </button>
          </form>
        </div>
      </Modal>
      <button
        className="backdropImg"
        onClick={() => setOpen(true)}
        style={{
          borderRadius: 15,
          backgroundColor: "#008080",
          color: "white",
          textDecoration: "none",
          padding: 10,
          width: "fit-content",
          border: "none",
        }}
      >
        Student Referral
      </button>
    </>
  );
}
