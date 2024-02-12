import React from 'react'
import WelcomePointers from './WelcomePointers';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AdjustIcon from '@mui/icons-material/Adjust';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CustomInputForm from './CustomInputForm';

export default function Welcome({ submitPrompt }) {
    return (
        <div style={{ backgroundColor: "transparent", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "transparent", width: "100%" }}>
                <div style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ backgroundColor: "transparent", fontSize: "48px", fontWeight: 700, color: "#E5E5E5" }}>
                        Welcome to <span style={{ padding: 3, borderLeft: "4px solid #8940FF", background: "linear-gradient(to right, rgba(137, 64, 255, 0.5), rgba(137, 64, 255, 0) 100%)" }}>LegalGPT</span>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: 10, fontSize: 16, background: "inherit" }}>
                        The power of AI at your Legal service
                    </div>
                </div>
                <CustomInputForm onSubmit={submitPrompt} />
                <div style={{ backgroundColor: "transparent", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 50, paddingTop: 100 }}>
                    <WelcomePointers icon={AutoAwesomeIcon} heading={"Efficiency"} subHeading={"Accelerates legal workflows."} />
                    <WelcomePointers icon={TrendingUpIcon} heading={"Precision"} subHeading={"Provides accurate legal insights."} />
                    <WelcomePointers icon={AdjustIcon} heading={"Accessibility"} subHeading={"Enhances legal information access."} />
                </div>
            </div>
        </div>
    )
}
