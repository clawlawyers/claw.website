import React from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RedeemIcon from '@mui/icons-material/Redeem';

import ambassadorshipImg from "../assets/images/ambassadorship.png";
import Styles from "./AmbassadorApply.module.css";

export default function AmbassadorApply() {
    return (
        <div style={{ width: "80%", margin: "auto", padding: 20, borderRadius: 20, backgroundColor: "#13161f", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 68, gap: 46 }}>
                <div style={{ display: "flex" }}>
                    <div>
                        <h1 className={Styles.heading} >
                            Brand Ambassadorship
                        </h1>
                        <p style={{ fontSize: 18, color: "#C9C7C7", textWrap: "wrap" }}>
                            Claw ambassadorship program is basically for undergraduate students and graduates who are looking for entry-level jobs.  As a brand ambassador, you will promote the platform within your circle and in return you will get the following benefits from us.
                        </p>
                        <p style={{ fontSize: 18, color: "#C9C7C7" }}>
                            If you are interested in participating in this feel apply with below button. Once you apply one of our coordinator will contact you soon.
                        </p>
                    </div>
                    <div className={Styles.img}>
                        <img alt="becoming an ambassador" src={ambassadorshipImg} />
                    </div>
                </div>
                <div>
                    <a target='_blank' rel='noreferrer' href='https://forms.gle/mszs8xtt2unuXU25A' style={{ textDecoration: "none", border: "none", padding: 12, borderRadius: 5, backgroundColor: "#008080", color: "white", fontSize: 18 }}>APPLY NOW</a>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: 30, backgroundColor: "#171E26", borderRadius: 20, textAlign: "center" }}>
                <div style={{ width: 317, display: "flex", alignItems: "center", flexDirection: "column", gap: 25 }}>
                    <LockOpenIcon style={{ fontSize: 70 }} />
                    <h4 style={{ fontSize: 20 }}>Access to Claw Resources</h4>
                    <p>Unlock Premium Access to Legal Tools - Leverage Claw's Cutting-Edge Resources and Stay at the Forefront of Legal Technology Advancements</p>
                </div>
                <div style={{ width: 317, display: "flex", alignItems: "center", flexDirection: "column", gap: 25 }}>
                    <EmojiEventsIcon style={{ fontSize: 70 }} />
                    <h4 style={{ fontSize: 20 }}>Recognition and Rewards</h4>
                    <p>Stand Out and Be Rewarded - Gain Recognition for Your Contributions as a Claw Campus Ambassador and Enjoy Exclusive Incentives</p>
                </div>
                <div style={{ width: 317, display: "flex", alignItems: "center", flexDirection: "column", gap: 25 }}>
                    <RedeemIcon style={{ fontSize: 70 }} />
                    <h4 style={{ fontSize: 20 }}>Exclusive Claw Merchandise</h4>
                    <p>Show Your Claw Pride - Receive Exclusive Claw Merchandise as a Token of Appreciation for Your Dedication and Efforts</p>
                </div>
            </div>
        </div >
    )
}
