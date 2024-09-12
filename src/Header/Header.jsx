import React, { useCallback, useEffect, useState } from "react";
import Styles from "./Header.module.css";
import clawLogo from "../assets/icons/clawlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { logout } from "../features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Drawer from "@mui/material/Drawer";

import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import FeedIcon from "@mui/icons-material/Feed";

import { Modal } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { close, open } from "../features/popup/popupSlice";
import { activePlanFeatures } from "../utils/checkActivePlanFeatures";

const navLinks = [
  { path: "/", label: "Home", icon: HomeIcon },
  // { path: "/blog", label: "Blog", icon: BookIcon },
  { path: "/pricing", label: "Pricing", icon: AttachMoneyIcon },
  { path: "/leaders", label: "Leaders", icon: LeaderboardIcon },
  { path: "/case/search", label: "Case Search", icon: SearchIcon },
  { path: "/gpt/legalGPT", label: "LegalGPT", icon: GavelIcon },
  { path: "/news", label: "News", icon: FeedIcon },
];

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activePlan, setActivePlan] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);
  const isAuthLoading = authStatus === "loading" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const handlePopupClose = useCallback(() => dispatch(close()), []);

  const handleAuthChange = () => {
    if (currentUser) dispatch(logout());
    else navigate("/login");
  };

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan));
    }
  }, [plan]);

  return (
    <div className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <div className={Styles.headerLogo}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "transparent",
            }}
          >
            <img
              alt="Claw"
              style={{
                backgroundColor: "transparent",
                height: 80,
                width: 90,
              }}
              src={clawLogo}
            />
          </Link>
        </div>
        <div className={Styles.headerLinks}>
          {/* <div style={{ backgroundColor: "transparent" }}> */}
          {/* <button>
              <Link
                to="/blog"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Blogs
              </Link>
            </button> */}
          {/* </div> */}
          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <Link
                to="/pricing"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Pricing
              </Link>
            </button>
          </div>
          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <Link
                to="/leaders"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Leaders
              </Link>
            </button>
          </div>
          <div style={{ backgroundColor: "transparent" }}>
            {activePlan ? (
              <>
                {activePlan[0]?.plan?.AICaseSearchAccess ? (
                  <button>
                    <Link
                      to="/case/search"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "transparent",
                      }}
                    >
                      Case Search
                    </Link>
                  </button>
                ) : (
                  <button
                    onClick={handlePopupOpen}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                  >
                    Case Search
                  </button>
                )}
              </>
            ) : (
              <button
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                <CircularProgress size={20} color="inherit" />
              </button>
            )}
          </div>
          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <Link
                to="/news"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                News
              </Link>
            </button>
          </div>
        </div>
        <div className={Styles.headerGPT}>
          <Link className={Styles.headerButton} to="/gpt/legalGPT">
            LegalGPT
          </Link>

          <button className={Styles.headerButton} onClick={handleAuthChange}>
            {isAuthLoading && (
              <CircularProgress size={16} style={{ color: "white" }} />
            )}
            {!isAuthLoading && (currentUser ? <>Logout</> : <>Login</>)}
          </button>
        </div>
        <button
          className={Styles.mobileNav}
          onClick={() => setNavOpen(true)}
          style={{ border: "none", backgroundColor: "inherit", color: "white" }}
        >
          <TableRowsIcon />
        </button>
        <Drawer
          PaperProps={{
            style: {
              backgroundColor: "#008080",
              color: "white",
            },
          }}
          anchor="top"
          open={navOpen}
          onClose={() => setNavOpen(false)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 10px 0px 0px",
            }}
          >
            <button
              style={{
                backgroundColor: "inherit",
                border: "none",
                color: "white",
              }}
              onClick={() => setNavOpen(false)}
            >
              <ClearIcon />
            </button>
          </div>
          <List sx={{ padding: "10px" }}>
            {navLinks.map(({ path, label, icon: Icon }, index) => (
              <ListItem
                key={path}
                sx={{ borderBottom: "1px solid white" }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    navigate(path);
                    setNavOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Icon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem key={"auth"} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleAuthChange();
                  setNavOpen(false);
                }}
              >
                <ListItemIcon>
                  <PersonIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={!isAuthLoading && (currentUser ? "Logout" : "Login")}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </div>
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
            <LockIcon style={{ fontSize: 80, color: "black" }} />
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
                onClick={handlePopupClose}
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
      </Modal>
    </div>
  );
}

export default Header;
