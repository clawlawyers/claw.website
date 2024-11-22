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
import fetchWrapper from "../utils/fetchWrapper";

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

  // useEffect(() => {
  //   async function fetchGptUser() {
  //     try {
  //       const res =await fetchWrapper.get(`${NODE_API_ENDPOINT}/gpt/user`)
  //       const parsed = await res.json();

  //       dispatch(setPlan({ plan: parsed.data.plan }));
  //       dispatch(setToken({ token: parsed.data.token }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if (currentUser) fetchGptUser();
  // }, [currentUser]);

  const handleCourtChange = (event) => {
    const {
      target: { value },
    } = event;
    // Update the state with the selected courts, allowing deselection

    setSelectedCourts(typeof value === "string" ? value.split(",") : value);
  };

  async function handleCaseSearch(e) {
    e.preventDefault();

    // const isEligible = await axios.post(
    //   `${NODE_API_ENDPOINT}/gpt/dummyCheckbox`,
    //   {
    //     phoneNumber: currentUser.phoneNumber,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${currentUser.jwt}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(isEligible);
    // if (!isEligible.data.data) {
    //   dispatch(open());
    //   return;
    // }
    if (selectedCourts.length === 0) {
      alert("Please select at least one court.");
      return;
    }
    const courtsString = selectedCourts.join(",");
    try {
      setLoading(true);
      if (
        token?.used?.caseSearchTokenUsed >=
          token?.total?.totalCaseSearchTokens ||
        parseFloat(token?.used?.caseSearchTokenUsed) + 1 >
          token?.total?.totalCaseSearchTokens
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
      console.log(parsed.success);
      if (parsed.success) {
        setResult(parsed.data.result);
        dispatch(setToken({ token: parsed.data.token }));
      }
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
      <Helmet>
        <title>Claw Case Search</title>
        <meta
          name="description"
          content="Claw's advanced case search empowers you to efficiently find relevant legal precedents. Search to navigate India's vast legal landscape with ease."
        />
      </Helmet>
      <div
        style={{
          color: "white",
          minHeight: "90vh",
          padding: "20px",
         
        }}
      >
       <div style={{ textAlign: "center", marginTop: "40px" }}> 
  <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
    Find Legal Cases With
  </h1>
  <h2
    style={{
      fontSize: "3.5rem",
      fontWeight: "700",
      background: 'linear-gradient(to bottom, #00767A, #00FFA3)', 
      WebkitBackgroundClip: 'text', 
      color: 'transparent',
      marginTop: "0",
      marginBottom: "10px",
    }}
  >
    Claw Case Search
  </h2>
</div>

  
        <div
  style={{
    display: "flex",
    justifyContent: "center",  
    alignItems: "center",     
    minHeight: "100vh",       
     
  }}
>
  <form onSubmit={handleCaseSearch} style={{ width: "90%", maxWidth: "800px",marginBottom:"160px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Case Search Input */}
      <div style={{ position: "relative", width: "100%" }}>
        <label
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            display: "block",
          }}
        >
          Enter Case Search:
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Prompt to find all the cases registered"
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "5px",
              border: "1px solid #008080",
              outline: "none",
              fontSize: "1rem",
              color: "black",
              height: "70px",
            }}
          />
          <button
            type="submit"
            style={{
              position: "absolute", 
              right:"10px", 
             
              background: 'linear-gradient(to right, #016466, #00152D)',
              color: "whitesmoke",
              padding: "10px 40px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              
            }}
          >
            Search
          </button>
        </div>
      </div>

      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
       
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Court Name:
          </label>
          <FormControl fullWidth>
            <Select
              value={selectedCourts}
              onChange={handleCourtChange}
              multiple
              displayEmpty
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px",
                borderRadius: "5px",
                height: "60px",
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select At Least One Court</em>;
                }
                return selected.join(", ");
              }}
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
                  </MenuItem> */}
                  <MenuItem value="Delhi High Court">Delhi High Court</MenuItem>
                  <MenuItem value="Delhi District Court">
                    Delhi District Court
                  </MenuItem>
                  {/* <MenuItem value="Madhya Pradesh High Court">
                    Madhya Pradesh High Court
                  </MenuItem> */}
                  {/* <MenuItem value="Allahabad High Court">
                    Allahabad High Court
                  </MenuItem> */}
                  <MenuItem value="Gujarat High Court">
                    Gujarat High Court
                  </MenuItem>
                  <MenuItem value="Rajasthan High Court">
                    Rajasthan High Court
                  </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Start Date Box */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Search Start Date:
          </label>
          <DatePicker
            value={startDate}
            onChange={(newVal) => setStartDate(newVal)}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                height: "60px",
              },
            }}
          />
        </div>

        {/* End Date Box */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Search End Date:
          </label>
          <DatePicker
            value={endDate}
            onChange={(newVal) => setEndDate(newVal)}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "5px",
                width: "100%",
                height: "60px",
              },
            }}
          />
        </div>
      </div>
    </div>
  </form>
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
