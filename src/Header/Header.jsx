import React from 'react';
import Styles from "./Header.module.css";
import clawLogo from "../assets/icons/clawlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/user/userSlice';

function Header({ onClickFeatures }) {
    const currentUser = useSelector(state => state.user.current);
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
                    <div style={{ marginRight: 30, backgroundColor: "transparent" }}>
                        <button onClick={onClickFeatures} >Features</button>
                    </div>
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
                    <div style={{ backgroundColor: "transparent" }}>
                        <button>
                            <Link to='/blog' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Ambassordship</Link>
                        </button>
                    </div>
                </div>
                <div className={Styles.headerGPT}>
                    <Link className={Styles.headerButton} to='/legalGPT' >
                        LegalGPT
                    </Link>

                    <button
                        className={Styles.headerButton}
                        onClick={handleAuthChange}
                    >
                        {currentUser ? <>Logout</> : <>Login</>}
                    </button>

                </div>
            </div>
        </div >
    )
}

export default Header