import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Styles from "./FooterBanner.module.css";

function FooterBanner() {
    return (
        <div className={Styles.footerContainer}>
            <div>
                <div style={{ fontSize: 40, fontWeight: 600 }}>Claw</div>

                <div style={{ fontSize: 18, color: "#777" }}>
                    Empowering Legal Solutions
                </div>
                <div style={{ fontSize: 18, color: "#777" }}>
                    Instantly
                </div>
                <div>
                    <a href='https://www.linkedin.com/company/claw-lawyers/' target='_blank' style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 18, color: "#777", marginTop: 10, textDecoration: "none" }}>
                        <LinkedInIcon />
                        Linkedin
                    </a>
                </div>

            </div>
            <div>
                <div style={{ fontSize: 25, fontWeight: 700, color: "#b384ff" }}>
                    Contact
                </div>

                <div style={{ marginTop: 10 }}>+91 9950866260</div>
                <div style={{ marginTop: 10 }}>Claw.lawyers@gmail.com</div>
                <div style={{ marginTop: 10 }}>Shela, Ahmedabad, Gujarat</div>

            </div>
            <div>
                <div style={{ color: "#b384ff", fontWeight: 700, fontSize: 20 }}>
                    Get the latest information
                </div>
                <div style={{ display: "flex", overflow: "hidden", borderRadius: 14, backgroundColor: "white", marginTop: 15 }}>
                    <div style={{ flex: 1, backgroundColor: "transparent", padding: 14 }}>
                        <input placeholder='Email Address' style={{ height: "100%", width: "100%", backgroundColor: "transparent", fontSize: 16, padding: 0, border: "none", outline: "none" }} />
                    </div>
                    <button style={{ padding: 11, backgroundColor: "#8940ff", border: "none" }}>
                        <SendIcon style={{ color: "white", backgroundColor: "transparent" }} />
                    </button>
                </div>
                <div style={{ color: "#777", marginTop: 10, fontSize: 15 }}>
                    Subscribe to our newsletter
                </div>
            </div>
        </div>
    )
}

export default FooterBanner