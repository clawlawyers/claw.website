import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

import Styles from "./FooterBanner.module.css";
import { NODE_API_ENDPOINT } from '../utils/utils';

function FooterBanner() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubscribe(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${NODE_API_ENDPOINT}/mailinglist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            if (!response.ok) throw new Error("Api Error");
            toast.success('Added to Mailing List')
        } catch (error) {
            toast.error("Something Went Wrong")
        }
        finally {
            setEmail("");
            setIsLoading(false);

        }
    }
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
                    <a href='https://www.linkedin.com/company/claw-lawyers/' target='_blank' rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 18, color: "#777", marginTop: 10, textDecoration: "none" }}>
                        <LinkedInIcon />
                        Linkedin
                    </a>
                </div>
                <div>
                    <a href='https://www.instagram.com/claw_lawyers/' target='_blank' rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 18, color: "#777", marginTop: 10, textDecoration: "none" }}>
                        <InstagramIcon />
                        Instagram
                    </a>
                </div>
                <div>
                    <a href='http://www.twitter.com/claw_lawyers' target='_blank' rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 18, color: "#777", marginTop: 10, textDecoration: "none" }}>
                        <XIcon />
                        X {"(Formely Twitter)"}
                    </a>
                </div>
                <div>
                    <a href='https://www.facebook.com/profile.php?id=61557181644675' target='_blank' rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 18, color: "#777", marginTop: 10, textDecoration: "none" }}>
                        <FacebookIcon />
                        Facebook
                    </a>
                </div>

            </div>
            <div>
                <div style={{ fontSize: 25, fontWeight: 700, color: "#029898" }}>
                    Contact
                </div>

                <div style={{ marginTop: 10 }}>+91 9950866260</div>
                <div style={{ marginTop: 10 }}>Claw.lawyers@gmail.com</div>
                <div style={{ marginTop: 10 }}>Shela, Ahmedabad, Gujarat</div>

            </div>
            <div>
                <div style={{ color: "#029898", fontWeight: 700, fontSize: 20 }}>
                    Get the latest information
                </div>
                <form onSubmit={handleSubscribe} style={{ display: "flex", overflow: "hidden", borderRadius: 14, backgroundColor: "white", marginTop: 15 }}>
                    <div style={{ flex: 1, backgroundColor: "transparent", padding: 14 }}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            disabled={isLoading}
                            placeholder='Email Address'
                            style={{ height: "100%", width: "100%", backgroundColor: "transparent", fontSize: 16, padding: 0, border: "none", outline: "none" }}
                        />
                    </div>
                    <button disabled={isLoading} type="submit" style={{ padding: 11, backgroundColor: "#008080", border: "none" }}>
                        {isLoading ? (
                            <CircularProgress style={{ color: "white", padding: 10 }} />
                        ) : <SendIcon style={{ color: "white", backgroundColor: "transparent" }} />}
                    </button>
                </form>
                <div style={{ color: "#777", marginTop: 10, fontSize: 15 }}>
                    Subscribe to our newsletter
                </div>
            </div>
        </div>
    )
}

export default FooterBanner