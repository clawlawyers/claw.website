import React, { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useMediaQuery } from "react-responsive";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import LockIcon from "@mui/icons-material/Lock";
import ClearIcon from "@mui/icons-material/Clear";
import { setCart } from "../features/cart/cartSlice";

import Sidebar from "./Sidebar";
import Style from "./LegalGPT.module.css";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { setPlan, setToken } from "../features/gpt/gptSlice";
import { close, open } from "../features/popup/popupSlice";

export default function GPTLayout(props) {
  const location = useLocation();
  const isPhoneMode = useMediaQuery({ query: "(max-width:768px)" });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const isOpen = useSelector((state) => state.popup.open);

  const handlePopupClose = useCallback(() => dispatch(close()), []);

  const handlePopupOpen = useCallback(() => dispatch(open()), []);
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
  }, [currentUser, dispatch]);

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
    <div
      className={Style.backdrop}
      style={{
        position: "relative",
        height: "100vh",
        overflowY: "hidden",
        width: "100%",
      }}
    >
      <Sidebar {...props} search={location.search} />
      <Modal open={isOpen} onClose={handlePopupClose}>
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
            <LockIcon style={{ fontSize: 80, color: props.primaryColor }} />
            <h3 style={{ fontSize: 28, fontWeight: 500 }}>Upgrade Now</h3>
            <div style={{ display: "flex", gap: 5 }}>
              {/* <StudentReferralModal /> */}
              {/* <button
                onClick={topuphandler}
                className={Style.backdropImg}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                  padding: 10,
                }}
              >
                <Link
                  className={Style.linkImg}
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
              </button> */}
              <button
                className={Style.backdropImg}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                  padding: 10,
                }}
              >
                <Link
                  className={Style.linkImg}
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
      <div
        className={Style.container}
        style={!isPhoneMode && collapsed ? { paddingLeft: "12px" } : null}
      >
        <div className={Style.gptContainer}>{<Outlet />}</div>
      </div>
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
              className={Style.backdropImg}
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
        className={Style.backdropImg}
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
