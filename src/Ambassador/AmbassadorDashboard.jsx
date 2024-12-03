import React, { useCallback, useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

import comingsoon from "../assets/images/comingsoon.png";
import trophy from "../assets/images/trophy.png";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { ClearIcon } from "@mui/x-date-pickers";
import Styles from "./AmbassadorDashboard.module.css";
import { Helmet } from "react-helmet";
import trophyIcon from "../assets/images/trophyCup.png";
import rankingIcon from "../assets/images/Ranking.png";
import leaderIcon from "../assets/images/leaderIcon.png";

export default function AmbassadorDashboard() {
  const { jwt } = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [accountNumber, setAccountNumber] = useState();
  const [accountName, setAccountName] = useState();
  const [ifscCode, setIfscCode] = useState();

  const fetchAmbassadorDetails = useCallback(
    async (controller) => {
      try {
        setLoading(true);
        const response = await fetch(`${NODE_API_ENDPOINT}/gpt/referralCode/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          signal: controller ? controller.signal : null,
        });
        const parsed = await response.json();
        setDetails(parsed.data);
        toast.success("Fetched Details");
        setLoading(false);
      } catch (error) {
        console.log(error);
        // toast.error("Something went wrong");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [jwt]
  );
  useEffect(() => {
    const controller = new AbortController();
    fetchAmbassadorDetails(controller);
    return () => controller.abort();
  }, [fetchAmbassadorDetails]);

  const handleClose = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${NODE_API_ENDPOINT}/client/update/bankdetails`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account: {
              holderName: accountName,
              number: accountNumber,
              ifsc: ifscCode,
            },
          }),
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const handleOpen = async () => {
    try {
      setLoading(true);
      setOpen(true);
      const response = await fetch(`${NODE_API_ENDPOINT}/client/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      const { data } = await response.json();
      setAccountName(data.account.holderName);
      setAccountNumber(data.account.number);
      setIfscCode(data.account.ifsc);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function generateReferralCode() {
    try {
      setLoading(true);
      const response = await fetch(
        `${NODE_API_ENDPOINT}/gpt/referralCode/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      const parsed = await response.json();
      setDetails(parsed.data);
      toast.success("Generated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={Styles.container}>
      <Helmet>
        <title>Become a Claw Brand Ambassador</title>
        <meta
          name="description"
          content="Join our dynamic community of brand ambassadors and help spread the word about CLAW's innovative legal tech solutions."
        />
        <meta
          name="keywords"
          content="dynamic, ambassador, community, privacy policies, business law services, brand, legal compliance, law firm automation, become"
        />
      </Helmet>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <div>
          <h3 className="text-[#00CACA]" style={{ fontWeight: 600 }}>
            Claw Leader's Dashboard
          </h3>
        </div>
        <button
          className={Styles.refreshButton}
          disabled={loading}
          style={{
            color: "white",
            borderRadius: 10,
            border: "2px solid #00FFFF",
            padding: "10px 18px",
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
          onClick={fetchAmbassadorDetails}
        >
          {/* <RefreshIcon /> */}
          Refresh Dashboard
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {/* left container */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              background: "linear-gradient(90deg,#C8FFFF,#388888)",
              color: "black",
              borderRadius: 23,
              padding: "20px 40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", flex: 1 }}>
              {loading ? (
                <div className="w-full flex items-center justify-center">
                  <CircularProgress style={{ color: "#008080" }} />
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <div>
                    <h1 className="text-3xl font-bold">Leader Details</h1>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>
                    <div>
                      <span className="text-[#388888]">Name</span> :{" "}
                      {details?.client &&
                        details?.client?.firstName +
                          " " +
                          details?.client?.lastName}
                    </div>
                    <div>
                      <span className="text-[#388888]">Referral Code</span> :{" "}
                      {details?.referralCode &&
                        details?.referralCode?.referralCode}
                    </div>
                    <div>
                      <span className="text-[#388888]">College Name</span> :{" "}
                      {details.client?.collegeName}
                    </div>
                  </div>
                  <div className="flex w-full" style={{ marginTop: 20 }}>
                    <button
                      onClick={handleOpen}
                      className={Styles.updateButton}
                      style={{
                        width: "100%",
                        color: "white",
                        borderRadius: "10px",
                      }}
                    >
                      Update Bank Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#CCFFFF",
              borderRadius: 23,
              padding: 30,
            }}
          >
            <div>
              <h1 className="text-3xl font-bold text-black">Your Stats</h1>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 24,
                marginTop: 20,
              }}
            >
              <div className="flex flex-col bg-[#004848] items-center justify-center p-3 rounded-lg">
                <p className="text-[#00FFFF] text-xl">Students Enrolled</p>
                <p className="text-6xl font-semibold text-white">
                  {details.redeemCount !== null ? details.redeemCount : "-"}
                </p>
              </div>
              <div className="flex flex-col bg-[#004848] items-center justify-center p-3 rounded-lg">
                <p className="text-[#00FFFF] text-xl">All India Rank</p>
                <p className="text-6xl font-semibold text-white">{"-"}</p>
              </div>
            </div>
          </div>
        </div>
        {/* right container */}
        <div
          style={{
            backgroundColor: "#004848",
            borderRadius: 23,
            padding: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-center gap-3 border-b-2 pb-3">
            <img src={trophyIcon} />
            <p className="text-2xl contents text-white">LeaderBoard</p>
            <img src={trophyIcon} />
          </div>
          <div className="flex-1 h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <img className="w-24 h-28" src={rankingIcon} />
              <p className="contents text-[#00FFFF] text-2xl">
                Ranking will be updated soon!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-2xl p-3"
        style={{
          marginTop: "20px",
          background: "linear-gradient(90deg,#018578,#00AC70)",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-4xl md:text-5xl">Announcements</h1>
          <p className="text-xl text-black font-semibold">
            Check important notifications here
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center justify-center w-full">
            <img className="w-96 h-96" src={leaderIcon} />
          </div>
          <div className="h-[70vh] overflow-auto flex flex-col gap-2">
            <div className="flex flex-col bg-[#004848] border border-white rounded p-2">
              <h5 className="">Announcements</h5>
              <p>Coming Soon !!</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
      >
        <div
          className={Styles.modal}
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "black",
            borderRadius: 10,
            overflowY: "scroll",
            padding: 40,
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <div style={{ top: 0, display: "flex", alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                // textAlign: "center",
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              Bank Details
            </div>
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              style={{ border: "none", background: "none", color: "black" }}
            >
              <ClearIcon style={{ fontSize: 30 }} />
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
              {" "}
              <CircularProgress size={20} style={{ color: "white" }} />
            </div>
          ) : (
            <form
              className="w-full"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 15,
                justifyContent: "center",
                padding: "25px 0px",
              }}
            >
              <div className="flex flex-col justify-center gap-[5px] w-full">
                <label style={{ fontSize: 15, fontWeight: 600 }}>
                  Account Name:
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 8,
                    outline: "none",
                    border: "1px solid #008080",
                  }}
                />
              </div>
              <div className="flex flex-col justify-center gap-[5px] w-full">
                <label style={{ fontSize: 15, fontWeight: 600 }}>
                  Account Number:
                </label>
                <input
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  type="number"
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 8,
                    outline: "none",
                    border: "1px solid #008080",
                  }}
                />
              </div>
              <div className="flex flex-col justify-center gap-[5px] w-full">
                <label style={{ fontSize: 15, fontWeight: 600 }}>
                  IFSC Code:
                </label>
                <input
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  type="text"
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 8,
                    outline: "none",
                    border: "1px solid #008080",
                  }}
                />
              </div>
            </form>
          )}
          <div
            style={{ display: "flex", justifyContent: "end", marginTop: 10 }}
          >
            <button
              disabled={loading}
              onClick={handleClose}
              style={{
                border: "none",
                padding: "5px 55px",
                backgroundColor: "#008080",
                borderRadius: 10,
                color: "white",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {loading ? (
                <CircularProgress size={20} style={{ color: "white" }} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Capsule({ value, label, loading }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        backgroundColor: "#008080",
        padding: "23px 0px",
      }}
    >
      {loading ? (
        <CircularProgress style={{ padding: 5, color: "white" }} />
      ) : (
        <h4 style={{ fontWeight: 600, fontSize: 29 }}>
          {value === null ? "-" : value}
        </h4>
      )}
      <h5 style={{ fontSize: 16 }}>{label}</h5>
    </div>
  );
}
