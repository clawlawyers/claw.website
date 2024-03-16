import React from 'react'
import WelcomePointers from './WelcomePointers';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AdjustIcon from '@mui/icons-material/Adjust';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CustomInputForm from './components/CustomInputForm';

import Styles from "./Welcome.module.css";

export default function Welcome({ submitPrompt, keyword, primaryColor, textGradient }) {
    return (
        <div style={{ backgroundColor: "transparent", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "transparent", width: "100%" }}>
                <div style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ backgroundColor: "transparent", fontSize: "48px", fontWeight: 700, color: "#E5E5E5" }}>
                        Welcome to <span style={{ padding: 3, borderLeft: `4px solid ${primaryColor}`, background: `linear-gradient(to right, ${textGradient[0]}, ${textGradient[1]} 100%)` }}>{keyword}GPT</span>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: 10, fontSize: 16, background: "inherit" }}>
                        The power of AI for your {keyword} service
                    </div>
                </div>
                <div className={Styles.secondaryContainer}>
                    <CustomInputForm primaryColor={primaryColor} onSubmit={submitPrompt} />
                    <div className={Styles.welcomePointerContainer}>
                        <WelcomePointers icon={AutoAwesomeIcon} heading={"Efficiency"} subHeading={`Accelerates ${keyword} workflows.`} />
                        <WelcomePointers icon={TrendingUpIcon} heading={"Precision"} subHeading={`Provides accurate ${keyword} insights.`} />
                        <WelcomePointers icon={AdjustIcon} heading={"Accessibility"} subHeading={`Enhances ${keyword} information access.`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
