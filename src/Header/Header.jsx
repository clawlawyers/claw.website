import React, { useRef } from 'react';
import Styles from "./Header.module.css";

function Header({ onClickFeatures, onClickBlogs }) {
    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.headerContent}>
                <div className={Styles.headerLogo} >
                    <a href='/' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Claw</a>
                </div>
                <div className={Styles.headerLinks}>
                    <div style={{ marginRight: 30, backgroundColor: "transparent" }}>
                        <button onClick={onClickFeatures} >Features</button>
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                        <button onClick={onClickBlogs} >Blog</button>
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