import React, { useCallback, useEffect, useState } from "react";
import Styles from "./Header.module.css";
import clawLogo from "../assets/icons/clawlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
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
import {
  ADIRA_ENDPOINT,
  LEGALGPT_ENDPOINT,
  WARROOM_ENDPOINT,
} from "../utils/utils";
import { useAdiraAuthState } from "../hooks/useAuthState";
import toast from "react-hot-toast";

const navLinks = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/blog", label: "Blog", icon: BookIcon },
  { path: "/pricing", label: "Pricing", icon: AttachMoneyIcon },
  // { path: "/leaders", label: "Leaders", icon: LeaderboardIcon },
  // { path: "/case/search", label: "Case Search", icon: SearchIcon },
  { path: "/news", label: "News", icon: FeedIcon },
  { path: "/contact-us", label: "Contact Us", icon: FeedIcon },
  // { path: "/gpt/legalGPT", label: "LegalGPT", icon: GavelIcon },
  // { path: "/gpt/socket", label: "LegalGPT", icon: GavelIcon },
];

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activePlan, setActivePlan] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const { plan } = useSelector((state) => state.gpt);
  const isOpen = useSelector((state) => state.popup.open);
  const isAuthLoading = authStatus === "loading" ? true : false;
  const activeAdiraPlan = useSelector((state) => state.payments.activePlan);
  const [showList, setShowList] = useState("");

  console.log(plan);

  const { isAdiraLoading } = useAdiraAuthState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePopupOpen = useCallback(() => dispatch(open()), []);
  const handlePopupClose = useCallback(() => dispatch(close()), []);

  const [anchorElProduct, setAnchorElProduct] = useState(null);

  const handleClickProduct = (event) => {
    setAnchorElProduct(event.currentTarget);
  };
  const handleCloseProduct = () => {
    setAnchorElProduct(null);
  };

  const openDialogProduct = Boolean(anchorElProduct);
  const idProduct = openDialogProduct ? "simple-popover" : undefined;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    window.open(`${ADIRA_ENDPOINT}/?user=${encodedStringBtoA}`);
  };
  const openWarrrom = () => {
    var encodedStringBtoA = btoa(JSON.stringify(currentUser));
    console.log(currentUser);
    console.log(encodedStringBtoA);
    window.open(`${WARROOM_ENDPOINT}?user=${encodedStringBtoA}`);
  };

  const openLegalGpt = () => {
    const reqdObj = {
      token: currentUser.jwt,
    };

    const encodedStringBtoA = btoa(JSON.stringify(reqdObj));
    window.open(`${LEGALGPT_ENDPOINT}?user=${encodedStringBtoA}`, "_self");
  };

  useEffect(() => {
    if (plan) {
      setActivePlan(activePlanFeatures(plan, "AICaseSearchAccess"));
    }
  }, [plan]);

  const handleLimitExceed = () => {
    toast.error("Daily limit already used. Please buy a plan!");
    navigate("/pricing");
    setNavOpen(false);
  };

  const handleProducts = () => {
    navigate("/login");
    setNavOpen(false);
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
            }}>
            <img
              alt="Claw"
              className="w-full rounded-none"
              style={{
                backgroundColor: "transparent",
                height: "60px",
                width: "100px",
                objectFit: "contain",
              }}
              src={clawLogo}
            />
          </Link>
        </div>
        <div className={Styles.headerLinks}>
          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <NavLink
                to="/pricing"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgba(0, 255, 157, 1)" : "white",
                  backgroundColor: "transparent",
                  transition: "color 0.3s ease",
                })}>
                Pricing
              </NavLink>
            </button>
          </div>

          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <NavLink
                to="/blog"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgba(0, 255, 157, 1)" : "white",
                  backgroundColor: "transparent",
                  transition: "color 0.3s ease",
                })}>
                Blog
              </NavLink>
            </button>
          </div>

          {/* <div style={{ backgroundColor: "transparent" }}>
            <button>
              <Link
                to="/leaders"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}>
                Leaders
              </Link>
            </button>
          </div> */}

          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <NavLink
                to="/news"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgba(0, 255, 157, 1)" : "white",
                  backgroundColor: "transparent",
                  transition: "color 0.3s ease",
                })}>
                News
              </NavLink>
            </button>
          </div>
          <div style={{ backgroundColor: "transparent" }}>
            <button>
              <NavLink
                to="/contact-us"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgba(0, 255, 157, 1)" : "white",
                  backgroundColor: "transparent",
                  transition: "color 0.3s ease",
                })}>
                Contact Us
              </NavLink>
            </button>
          </div>
        </div>

        <div className={Styles.headerGPT}>
          <>
            {currentUser ? (
              <>
                {plan?.length > 0 ? (
                  <button
                    onClick={(e) => handleClickProduct(e)}
                    className={`${Styles.headerButton} `}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      //   backgroundColor: "transparent",
                    }}>
                    Products
                  </button>
                ) : (
                  <button
                    className={Styles.headerButton}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      //   backgroundColor: "transparent",
                    }}>
                    <CircularProgress size={15} sx={{ color: "white" }} />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={`${Styles.headerButton} text-yellow-600`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "transparent",
                }}>
                Products
              </button>
            )}
            {anchorElProduct && (
              <Popover
                sx={{ marginTop: "5px", opacity: "0.98" }}
                id={idProduct}
                open={openDialogProduct}
                anchorEl={anchorElProduct}
                onClose={handleCloseProduct}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}>
                <div
                  className="p-3  w-52 bg-black z-20 border-2 border-[#00C37B] rounded"
                  style={{
                    background: "linear-gradient(135deg,#003723E5,#1D2330E5)",
                  }}>
                  <div>
                    {!isAdiraLoading ? (
                      <>
                        {activeAdiraPlan && activeAdiraPlan.isActive ? (
                          <p
                            onClick={openAdiraAi}
                            className="m-0 text-white border-b border-white px-2  py-2 cursor-pointer hover:bg-white hover:bg-opacity-20 ">
                            Adira
                          </p>
                        ) : (
                          <Link
                            to={"/pricing"}
                            className="m-0 text-white border-b border-white py-2 cursor-pointer flex hover:bg-white hover:bg-opacity-5 "
                            style={{ textDecoration: "none" }}>
                            Adira
                          </Link>
                        )}
                      </>
                    ) : (
                      <p className="m-0 text-white border-b border-white py-2  cursor-pointer hover:bg-white hover:bg-opacity-5 ">
                        <CircularProgress size={15} color="inherit" />
                      </p>
                    )}
                  </div>
                  <div>
                    {true ? (
                      <p
                        className="m-0 text-white border-b border-white py-2 px-2 cursor-pointer hover:bg-white hover:bg-opacity-20 "
                        onClick={openWarrrom}>
                        War Room
                      </p>
                    ) : (
                      <p
                        className="m-0 text-white border-b border-white py-2 cursor-pointer hover:bg-white hover:bg-opacity-5 "
                        onClick={handlePopupOpen}>
                        War Room
                      </p>
                    )}
                  </div>
                  <div>
                    {/* {activePlan ? (
                      <>
                        {activePlan[0]?.plan?.AICaseSearchAccess ? ( */}
                    {/* <p
                      className="m-0 w-full py-2 border-b border-white cursor-pointer hover:bg-white hover:bg-opacity-5 "
                      onClick={() => setAnchorElProduct(null)}
                    >
                      <Link
                        className=" text-white hover:bg-white hover:bg-opacity-5 "
                        style={{ textDecoration: "none" }}
                        to="/case/search"
                      >
                        Case Search
                      </Link>
                    </p> */}
                    {/* ) : (
                          <p
                            onClick={handlePopupOpen}
                            className="m-0 text-white border-b border-white py-2 cursor-pointer"
                          >
                            Case Search
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="m-0 text-white border-b border-white p-1 cursor-pointer">
                        <CircularProgress size={20} color="inherit" />
                      </p>
                    )} */}
                  </div>
                  {/*  <div> 
                    <p className="m-0 py-2 border-b border-white cursor-pointer">
                      <Link
                        className=" text-white "
                        style={{ textDecoration: "none" }}
                        to="/gpt/legalGPT"
                      >
                        LegalGPT
                      </Link>
                    </p>
                  </div>*/}
                  {/* <div>
                    <p className="m-0 py-2 border-b border-white cursor-pointer hover:bg-white hover:bg-opacity-5 ">
                      <Link
                        className=" text-white "
                        style={{ textDecoration: "none" }}
                        to="/gpt/socket"
                      >
                        LegalGPT
                      </Link>
                    </p>
                  </div> */}
                  <div>
                    <p
                      onClick={
                        plan !== null &&
                        plan[0].planName === "FREE" &&
                        plan[0].totalUsed >= 15
                          ? handleLimitExceed
                          : openLegalGpt
                      }
                      className="m-0 py-2 text-white border-b border-white px-2 cursor-pointer hover:bg-white hover:bg-opacity-20 ">
                      LegalGPT
                    </p>
                  </div>
                </div>
              </Popover>
            )}
          </>
          {!currentUser ? (
            <button
              className={Styles.headerButton}
              // class="flex flex-1 items-center justify-center  text-white font-medium text-lg rounded-lg p-2.5 border-none "
              onClick={handleAuthChange}>
              {isAuthLoading ? (
                <CircularProgress size={16} style={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </button>
          ) : (
            <>
              <button
                className={Styles.headerButton2}
                onClick={currentUser ? handleClick : null}>
                {/* {!isAuthLoading && (currentUser ? <>My Account</> : <>Login</>)} */}
                <AccountCircleIcon></AccountCircleIcon>
              </button>
              {anchorEl && (
                <Popover
                  sx={{ marginTop: "5px", opacity: "0.98" }}
                  id={id}
                  open={openDialog}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}>
                  <div
                    className="p-3 w-full bg-black z-20 border-2 border-[#00C37B] rounded"
                    style={{
                      background: "linear-gradient(135deg,#003723E5,#1D2330E5)",
                    }}>
                    <Link
                      onClick={() => setAnchorEl(null)}
                      style={{ textDecoration: "none" }}
                      to={"/purchases"}>
                      <p className="text-white border-b border-white p-1 cursor-pointer hover:bg-white hover:bg-opacity-20 ">
                        All Purchases
                      </p>
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="text-white border-b border-white p-1 cursor-pointer hover:bg-white hover:bg-opacity-20 ">
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
          onClick={() => {
            setNavOpen(true);
            setShowList("");
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "white",
          }}>
          <TableRowsIcon />
        </button>
        <Drawer
          PaperProps={{
            style: {
              backgroundColor: "black",
              color: "white",
            },
          }}
          anchor="top"
          open={navOpen}
          onClose={() => {
            setNavOpen(false);
            setShowList("");
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 10px 0px 0px",
            }}>
            <button
              style={{
                backgroundColor: "inherit",
                border: "none",
                color: "white",
              }}
              onClick={() => {
                setNavOpen(false);
                setShowList("");
              }}>
              <ClearIcon />
            </button>
          </div>
          {showList === "login" ? (
            <List sx={{ padding: "10px" }}>
              <ListItem
                key={"purchase"}
                sx={{ padding: "5px 0px" }}
                disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    background: "linear-gradient(90deg,#005F62,#00C37B)",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate("/purchases");
                    setNavOpen(false);
                  }}>
                  <ListItemText primary={"All Purchases"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"auth"} sx={{ padding: "5px 0px" }}>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    background: "linear-gradient(90deg,#005F62,#00C37B)",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    handleLogout();
                    setNavOpen(false);
                  }}>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"back"} sx={{ padding: "40px 0px 0px 0px" }}>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    background: "linear-gradient(90deg,#005F62,#00C37B)",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    setShowList("");
                  }}>
                  <ListItemText primary={"Back"} />
                </ListItemButton>
              </ListItem>
            </List>
          ) : showList === "products" ? (
            <List
              sx={{
                padding: "10px",
                background: "linear-gradient(90deg,#005F62,#00C37B)",
              }}>
              <h1 className="text-center">Products</h1>
              <ListItem
                key={"LegalGPT"}
                sx={{ borderBottom: "1px solid white" }}
                disablePadding>
                <ListItemButton
                  onClick={
                    plan !== null &&
                    plan[0]?.planName === "FREE" &&
                    plan[0]?.totalUsed >= 15
                      ? handleLimitExceed
                      : openLegalGpt
                  }
                  sx={{ textAlign: "center" }}>
                  <ListItemText primary={"LEGALGPT"} />
                </ListItemButton>
              </ListItem>
              <ListItem
                key={"War Room"}
                sx={{ borderBottom: "1px solid white" }}
                disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={openWarrrom}>
                  <ListItemText primary={"WAR ROOM"} />
                </ListItemButton>
              </ListItem>
              {!isAdiraLoading ? (
                <ListItem
                  key={"adira"}
                  sx={{ borderBottom: "1px solid white" }}
                  disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      activeAdiraPlan && activeAdiraPlan.isActive
                        ? openAdiraAi()
                        : navigate("/pricing");
                      setNavOpen(false);
                    }}>
                    <ListItemText primary={"ADIRA"} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem
                  key={"adira"}
                  sx={{ borderBottom: "1px solid white" }}
                  disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={"Adira Loading..."} />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem key={"back"} sx={{ padding: "10px" }} disablePadding>
                <button
                  onClick={() => setShowList("")}
                  className="hover:bg-black w-full"
                  style={{
                    textAlign: "center",
                    background: "black",
                    borderRadius: "5px",
                  }}>
                  <ListItemText primary={"Back"} />
                </button>
              </ListItem>
            </List>
          ) : (
            <List sx={{ padding: "10px" }}>
              {navLinks.map(({ path, label, icon: Icon }, index) => (
                <ListItem
                  key={path}
                  sx={{ borderBottom: "1px solid white" }}
                  disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(path);
                      setNavOpen(false);
                    }}
                    sx={{ textAlign: "center" }}>
                    {/* <ListItemIcon>
                    <Icon style={{ color: "white" }} />
                  </ListItemIcon> */}
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem
                key={"Products"}
                sx={{
                  padding: "5px 0px",
                }}
                disablePadding>
                <ListItemButton
                  onClick={() =>
                    currentUser && plan.length > 0
                      ? setShowList("products")
                      : handleProducts()
                  }
                  sx={{
                    textAlign: "center",
                    background: "linear-gradient(90deg,#005F62,#00C37B)",
                    borderRadius: "5px",
                  }}>
                  <ListItemText primary={"Products"} />
                </ListItemButton>
              </ListItem>
              {currentUser ? (
                <ListItem
                  key={"My Account"}
                  sx={{
                    padding: "5px 0px",
                  }}
                  disablePadding>
                  <ListItemButton
                    onClick={() => setShowList("login")}
                    sx={{
                      textAlign: "center",
                      background: "linear-gradient(90deg,#005F62,#00C37B)",
                      borderRadius: "5px",
                    }}>
                    <ListItemText primary={"My Account"} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem
                  key={"Login"}
                  sx={{
                    padding: "5px 0px",
                  }}
                  disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleAuthChange();
                      setNavOpen(false);
                    }}
                    sx={{
                      textAlign: "center",
                      background: "linear-gradient(90deg,#005F62,#00C37B)",
                      borderRadius: "5px",
                    }}>
                    <ListItemText primary={"Login"} />
                  </ListItemButton>
                </ListItem>
              )}

              {/* {currentUser ? (
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
                    primary={
                      !isAuthLoading && (currentUser ? "Logout" : "Login")
                    }
                  />
                </ListItemButton>
              </ListItem> */}
            </List>
          )}
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
          }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <button
              onClick={handlePopupClose}
              style={{
                border: "none",
                backgroundColor: "inherit",
                backgroundImage: "none",
              }}>
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
            }}>
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
                  }}>
                  <p
                    className={Styles.linkImg}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      width: "fit-content",
                      border: "none",
                      margin: 0,
                    }}>
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
