import React from 'react';
import Styles from "./Header.module.css";
import clawLogo from "../assets/icons/clawlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';

function Header({ onClickFeatures }) {
    const currentUser = useSelector(state => state.auth.user);
    const authStatus = useSelector(state => state.auth.status);
    const location = useLocation();
    const isAuthLoading = authStatus === 'loading' ? true : false;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAuthChange = () => {
        if (currentUser) dispatch(logout());
        else navigate("/login");
    }
    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.headerContent}>
                <div className={Styles.headerLogo} >
                    <Link to='/' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>
                        <img alt="Claw" style={{ backgroundColor: "transparent", height: 53 }} src={clawLogo} />
                    </Link>
                </div>
                <div className={Styles.headerLinks}>
                    {location.pathname === '/' && <div style={{ marginRight: 30, backgroundColor: "transparent" }}>
                        <button onClick={onClickFeatures} >Features</button>
                    </div>}

                    <div style={{ backgroundColor: "transparent" }}>
                        <button>
                            <Link to='/blog' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Blog</Link>
                        </button>
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                        <button>
                            <Link to='/pricing' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Pricing</Link>
                        </button>
                    </div>
                    {!isAuthLoading && (
                        <>
                            {
                                currentUser && currentUser.ambassador ? <div style={{ backgroundColor: "transparent" }}>
                                    <button>
                                        <Link to='/ambassador/dashboard' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Ambassador</Link>
                                    </button>
                                </div> : <div style={{ backgroundColor: "transparent" }}>
                                    <button>
                                        <Link to='/ambassadorship' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Ambassadorship</Link>
                                    </button>
                                </div>
                            }
                            {
                                currentUser && <div style={{ backgroundColor: "transparent" }}>
                                    <button>
                                        <Link to='/case/search' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Case Search</Link>
                                    </button>
                                </div>
                            }
                        </>
                    )}
                </div>
                <div className={Styles.headerGPT}>
                    <Link className={Styles.headerButton} to='/gpt/legalGPT' >
                        LegalGPT
                    </Link>

                    <button
                        className={Styles.headerButton}
                        onClick={handleAuthChange}
                    >
                        {isAuthLoading && <CircularProgress size={16} style={{ color: "white" }} />}
                        {!isAuthLoading && (currentUser ? <>Logout</> : <>Login</>)}
                    </button>

                </div>
            </div>
        </div >
    )
}

export default Header