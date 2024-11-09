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
import FilePresentIcon from "@mui/icons-material/FilePresent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import FeedIcon from "@mui/icons-material/Feed";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Modal, Popover } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { close, open } from "../features/popup/popupSlice";
import { activePlanFeatures } from "../utils/checkActivePlanFeatures";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const navLinks = [
  { path: "/", label: "Home", icon: HomeIcon },
  // { path: "/blog", label: "Blog", icon: BookIcon },
  { path: "/pricing", label: "Pricing", icon: AttachMoneyIcon },
  { path: "/leaders", label: "Leaders", icon: LeaderboardIcon },
  // { path: "/case/search", label: "Case Search", icon: SearchIcon },
  { path: "/news", label: "News", icon: FeedIcon },
  { path: "/gpt/legalGPT", label: "LegalGPT", icon: GavelIcon },
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(plan);
  // console.log(plan?.length);

  const openDialog = Boolean(anchorEl);
  const id = openDialog ? "simple-popover" : undefined;

  const handleAuthChange = () => {
    // if (currentUser) dispatch(logout());
    // else
    navigate("/login");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/");
  };

  const openAdiraAi = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`http://adira.clawlaw.in/?user=${encodedStringBtoA}`);
  };

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "AICaseSearchAccess"));
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
              className="w-full rounded-none"
              style={{
                backgroundColor: "transparent",
                // height: 80,
                // width: 90,
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
          <div>
            {plan?.length > 0 ? (
              <button
                onClick={openAdiraAi}
                className={Styles.headerButton}
                style={{
                  textDecoration: "none",
                  color: "white",
                  // backgroundColor: "transparent",
                }}
              >
                Adira
              </button>
            ) : (
              // </button>
              <button className={Styles.headerButton} onClick={handlePopupOpen}>
                Adira
              </button>
            )}
          </div>
          <div>
            {activePlan ? (
              <>
                {activePlan[0]?.plan?.AICaseSearchAccess ? (
                  <button className={Styles.headerButton}>
                    <Link
                      to="/case/search"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        //   backgroundColor: "transparent",
                      }}
                      // className={Styles.headerButton}
                    >
                      Case Search
                    </Link>
                  </button>
                ) : (
                  <button
                    onClick={handlePopupOpen}
                    className={Styles.headerButton}
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
          <button className={Styles.headerButton}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                //   backgroundColor: "transparent",
              }}
              to="/gpt/legalGPT"
            >
              LegalGPT
            </Link>
          </button>
          {!currentUser ? (
            <button
              className={Styles.headerButton}
              // class="flex flex-1 items-center justify-center  text-white font-medium text-lg rounded-lg p-2.5 border-none "
              onClick={handleAuthChange}
            >
              {isAuthLoading && (
                <CircularProgress size={16} style={{ color: "white" }} />
              )}
              {/* {!isAuthLoading && (currentUser ? <>My Account</> : <>Login</>)} */}
              Login
            </button>
          ) : (
            <>
              <button
                className={Styles.headerButton2}
                onClick={currentUser ? handleClick : null}
              >
                {/* {!isAuthLoading && (currentUser ? <>My Account</> : <>Login</>)} */}
                <AccountCircleIcon></AccountCircleIcon>
              </button>
              {anchorEl && (
                <Popover
                  sx={{ marginTop: "5px", opacity: "0.7" }}
                  id={id}
                  open={openDialog}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div
                    className="p-3 w-full bg-black z-20 border-2 border-[#00C37B] rounded"
                    style={{
                      background: "linear-gradient(135deg,#003723E5,#1D2330E5)",
                    }}
                  >
                    <Link
                      onClick={() => setAnchorEl(null)}
                      style={{ textDecoration: "none" }}
                      to={"/purchases"}
                    >
                      <p className="text-white border-b border-white p-1 cursor-pointer">
                        All Purchases
                      </p>
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="text-white border-b border-white p-1 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </Popover>
              )}
            </>
          )}
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
            <ListItem
              key={"caseSearch"}
              sx={{ borderBottom: "1px solid white" }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  activePlan[0]?.plan?.AICaseSearchAccess
                    ? navigate("/case/search")
                    : handlePopupOpen();
                  setNavOpen(false);
                }}
              >
                <ListItemIcon>
                  <SearchIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Case Search"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              key={"adira"}
              sx={{ borderBottom: "1px solid white" }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  activePlan[0]?.plan?.AICaseSearchAccess
                    ? navigate("/case/search")
                    : handlePopupOpen();
                  setNavOpen(false);
                }}
              >
                <ListItemIcon>
                  <FilePresentIcon style={{ color: "white" }}></FilePresentIcon>
                </ListItemIcon>
                <ListItemText primary={"Adira"} />
              </ListItemButton>
            </ListItem>
            {currentUser ? (
              <ListItem
                key={"purchase"}
                sx={{ borderBottom: "1px solid white" }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    navigate("/purchases");
                    setNavOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"All Purchases"} />
                </ListItemButton>
              </ListItem>
            ) : null}
            <ListItem key={"auth"} disablePadding>
              <ListItemButton
                onClick={() => {
                  currentUser ? handleLogout() : handleAuthChange();
                  // handleAuthChange();
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
              <Link to="/pricing" style={{ textDecoration: "none" }}>
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
                  <p
                    className={Styles.linkImg}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      width: "fit-content",
                      border: "none",
                      margin: 0,
                    }}
                  >
                    Buy Credits
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
