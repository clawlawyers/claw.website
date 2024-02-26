import React from 'react';
import Styles from "./Header.module.css";
import clawLogo from "../assets/icons/clawlogo.png"

function Header({ onClickFeatures }) {
    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.headerContent}>
                <div className={Styles.headerLogo} >
                    <a href='/' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>
                        <img alt="Claw" style={{ backgroundColor: "transparent", height: 50 }} src={clawLogo} />
                    </a>
                </div>
                <div className={Styles.headerLinks}>
                    <div style={{ marginRight: 30, backgroundColor: "transparent" }}>
                        <button onClick={onClickFeatures} >Features</button>
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                        <button><a href='/blog' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Blog</a></button>
                    </div>
                </div>
                <div className={Styles.headerGPT}>
                    <button><a href='/legalGPT' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Try LegalGPT</a></button>
                </div>
            </div>
        </div>
    )
}

export default Header