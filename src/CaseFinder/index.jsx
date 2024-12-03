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
import axios from "axios";
import { Helmet } from "react-helmet";

const courts = [
  "Supreme Court of India",
  "Chattisgarh High Court",
  "Sikkim High Court",
  "Uttarakhand High Court",
  "Calcutta High Court",
  "Jammu and Kashmir High Court",
  "Delhi High Court",
  "Delhi District Court",
  "Gujarat High Court",
  "Rajasthan High Court",
];

export default function CaseFinder({
  keyword = "Legal",
  primaryColor = "#008080",
  model = "legalGPT",
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment("18-sep-01"));
  const [endDate, setEndDate] = useState(moment("19-sep-20"));
  const [result, setResult] = useState([]);
  // console.log(result);
  const [search] = useSearchParams();
  const { messageId, cases } = useSelector((state) => state.gpt.relatedCases);
  const currentUser = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.open);
  const handlePopupClose = useCallback(() => dispatch(close()), [dispatch]);
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const [selectedCourts, setSelectedCourts] = useState([]);

  // useEffect(() => {
  //   async function fetchGptUser() {
  //     try {
  //       const res = await fetch(`${NODE_API_ENDPOINT}/gpt/user`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${currentUser.jwt}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const parsed = await res.json();

  //       dispatch(setPlan({ plan: parsed.data.plan }));
  //       dispatch(setToken({ token: parsed.data.token }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if (currentUser) fetchGptUser();
  // }, [currentUser, dispatch]);

  const handleCourtChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }, []);

  async function handleCaseSearch(e) {
    e.preventDefault();

    if (selectedCourts.length === 0) {
      alert("Please select at least one court.");
      return;
    }

    const courtsString = selectedCourts.join(",");
    try {
      setLoading(true);
      // if (
      //   token?.used?.caseSearchTokenUsed >=
      //     token?.total?.totalCaseSearchTokens ||
      //   parseFloat(token?.used?.caseSearchTokenUsed) + 1 >
      //     token?.total?.totalCaseSearchTokens
      // ) {
      //   dispatch(open());
      //   throw new Error(
      //     "Not enough tokens, please upgrade or try again later!"
      //   );
      // }

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
      if (parsed.success) {
        setResult(parsed.data.result);
        // dispatch(setToken({ token: parsed.data.token }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl text-white font-bold m-0">
          Find Legal Cases With
        </p>
        <p
          className="text-7xl font-bold"
          style={{
            background: "linear-gradient(to bottom, #003131 0%, #00FFA3 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",

            color: "transparent",
          }}
        >
          Claw Case Search
        </p>
      </div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Helmet>
          <title>Claw Case Search</title>
          <meta
            name="description"
            content="Claw's advanced case search empowers you to efficiently find relevant legal precedents. Search to navigate India's vast legal landscape with ease."
          />
          <meta
            name="keywords"
            content="digital legal transformation, privacy policies, your, us, concerns, business law services, data-driven law, legal news insights, legal compliance, questions"
          />
        </Helmet>
        <div className="m-auto w-[80%]">
          {/* <div
          className={`${
            collapsed ? Styles.contentContainer : Styles.contentContainer1
          }`}
        > */}
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
                  <button
                    onClick={handlePopupClose}
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
          <div>
            <label>Enter Case Search</label>
            <form
              onSubmit={handleCaseSearch}
              style={{
                marginTop: 2,
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
                  color: "black",
                }}
                placeholder="Enter your prompt to find all registered cases..."
              />
              <button
                type="submit"
                className={Styles.bgbutton}
                style={{
                  backgroundColor: primaryColor,
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  padding: "10px 30px",
                  cursor: "pointer",
                  marginLeft: 10,
                }}
              >
                Search
              </button>
            </form>
          </div>
          <div className={Styles.inputGrid}>
            <div className="flex-1">
              <div>Court Name</div>
              <FormControl
                sx={{ width: "100%" }}
                error={selectedCourts.length === 0}
              >
                <Select
                  multiple
                  value={selectedCourts}
                  onChange={handleCourtChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                          Select a court....
                        </span>
                      );
                    }
                    return (
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
                    );
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                    // Important: This keeps the menu from auto-closing on select
                    autoFocus: false,
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    maxWidth: "450px",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  {courts.map((court) => (
                    <MenuItem key={court} value={court}>
                      {court}
                    </MenuItem>
                  ))}
                </Select>
                {selectedCourts.length === 0 && (
                  <FormHelperText>
                    Please select at least one court.
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div>
                <div>Search Start Date</div>
                <DatePicker
                  value={startDate}
                  onChange={(newVal) => setStartDate(newVal)}
                  sx={{ backgroundColor: "white", borderRadius: "10px" }}
                />
              </div>
              <div>
                <div>Search End Date</div>
                <DatePicker
                  value={endDate}
                  onChange={(newVal) => setEndDate(newVal)}
                  sx={{ backgroundColor: "white", borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>

          <div
            className="h-screen mt-5"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ color: "white" }} />
              </div>
            ) : (
              <div className="flex flex-col gap-3 overflow-auto">
                {/* {result
                ? result.map((relatedCase) => (
                    <CaseCard
                      caseId={relatedCase.case_id}
                      name={relatedCase.Title}
                      date={relatedCase.Date}
                      citations={relatedCase.num_cites}
                      court={relatedCase.court}
                      key={relatedCase.id}
                      query={query}
                    />
                  ))
                : search.get("id") === messageId &&
                  cases.map((relatedCase) => (
                    <CaseCard
                      caseId={relatedCase.case_id}
                      name={relatedCase.Title}
                      citations={relatedCase.num_cites}
                      date={relatedCase.Date}
                      court={relatedCase.court}
                      key={relatedCase.id}
                      query={query}
                    />
                  ))} */}
                {result.map((relatedCase) => (
                  <CaseCard
                    caseId={relatedCase.case_id}
                    name={relatedCase.Title}
                    date={relatedCase.Date}
                    citations={relatedCase.num_cites}
                    court={relatedCase.court}
                    key={relatedCase.id}
                    query={query}
                  />
                ))}
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </LocalizationProvider>
    </div>
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
