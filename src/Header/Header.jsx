import React, { useState } from "react";
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

const navLinks = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/blog", label: "Blog", icon: BookIcon },
  { path: "/pricing", label: "Pricing", icon: AttachMoneyIcon },
  { path: "/leaders", label: "Leaders", icon: LeaderboardIcon },
  { path: "/case/search", label: "Case Search", icon: SearchIcon },
  { path: "/gpt/legalGPT", label: "LegalGPT", icon: GavelIcon },
  { path: "/news", label: "News", icon: FeedIcon },
];

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const isAuthLoading = authStatus === "loading" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthChange = () => {
    if (currentUser) dispatch(logout());
    else navigate("/login");
  };

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
          <div style={{ backgroundColor: "transparent" }}>
            <button>
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
            </button>
          </div>
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
          PaperProps={{ style: { backgroundColor: "black", color: "white" } }}
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
          <List>
            {navLinks.map(({ path, label, icon: Icon }, index) => (
              <ListItem key={path} disablePadding>
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
    </div>
  );
}

export default Header;
