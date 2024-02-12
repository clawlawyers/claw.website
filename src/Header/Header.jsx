import React from 'react';
import Styles from "./Header.module.css";

function Header() {
    console.log(Styles)
    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.headerContent}>
                <div className={Styles.headerLogo} >
                    <a href='/' style={{ textDecoration: "none", color: "white", backgroundColor: "transparent" }}>Claw</a>
                </div>
                <div className={Styles.headerLinks}>
                    <div style={{ marginRight: 60, backgroundColor: "transparent" }}>
                        Features
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                        Blog
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