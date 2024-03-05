import React, { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Pricing() {
    return (
        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", height: "100%", zIndex: 2 }}>
            <div style={{ width: "100%", flex: 1, color: "white" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <h1 style={{ fontSize: 45, fontWeight: 800 }}>
                        Your First Month FREE with Claw's Exclusive Offer
                    </h1>
                    <div style={{ width: "70%" }}>
                        <h5 style={{ fontSize: 25, fontWeight: 500 }}>
                            Experience the Future of Legal Services Without Commitment – Dive into One Month of Claw, On the House!
                        </h5>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 15 }}>
                    <h1 style={{ margin: 0, fontWeight: 600 }}>
                        <div>Free offer ends in!!</div>
                        <Timer />
                    </h1>
                </div>
            </div>
            <div style={{ marginTop: 50 }}>
                <div style={{ width: "80%", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: 'space-around', gap: 16 }}>
                    <PricingCard
                        duration="Monthy"
                        description="Get started with the fundamental tools you need for your legal journey at an affordable price"
                        features={
                            [
                                { active: true, name: "Access to legalGPT" },
                                { active: true, name: "Priority Search and Match" },
                                { active: false, name: "Extended Profile Customization" },
                                { active: false, name: "Secure Communication Channels" },
                                { active: false, name: "Exclusive Pricing Insights" },
                                { active: false, name: "Early Access to New Features" },
                            ]
                        }
                    />
                    <PricingCard
                        duration="Yearly"
                        description="Unlock premium features and enjoy a heightened level of legal support tailored to your specific needs"
                        features={
                            [
                                { active: true, name: "Access to legalGPT" },
                                { active: true, name: "Priority Search and Match" },
                                { active: true, name: "Extended Profile Customization" },
                                { active: true, name: "Secure Communication Channels" },
                                { active: false, name: "Exclusive Pricing Insights" },
                                { active: false, name: "Early Access to New Features" },
                            ]
                        }
                    />
                    <PricingCard
                        duration="Enterprise"
                        description="Tailored for those who demand the highest level of expertise and personalized legal assistance"
                        features={
                            [
                                { active: true, name: "Access to legalGPT" },
                                { active: true, name: "Priority Search and Match" },
                                { active: true, name: "Extended Profile Customization" },
                                { active: true, name: "Secure Communication Channels" },
                                { active: true, name: "Exclusive Pricing Insights" },
                                { active: true, name: "Early Access to New Features" },
                            ]
                        }
                    />

                </div>
            </div>
        </div>
    )
}


const PricingCard = ({ duration, description, features, link }) => {
    return <div style={{ width: 350, border: "1px solid white", backgroundColor: "white", color: "black", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{duration}</h3>
            <h4 style={{ fontSize: 16, fontWeight: 500, color: "#777", margin: 0 }}>{description}</h4>
        </div>
        <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>199</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {features.map(({ active, name }) => {
                if (!active) {
                    return <div style={{ display: "flex", gap: 8, fontSize: 16, fontWeight: 500, color: "#777" }}>
                        <CheckCircleOutlineIcon />
                        <div>{name}</div>
                    </div>
                }
                else return <div style={{ display: "flex", gap: 8, fontSize: 16 }}>
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                    <div>{name}</div>
                </div>
            })}
        </div>
        <div>
            <button style={{ width: "100%", padding: "14px 0px", border: "none", backgroundColor: "#8940FF", borderRadius: 8, color: "white", fontSize: 16 }}>
                Get Started
            </button>
        </div>
    </div>
}

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "March, 31, 2024";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [])

    return <div>
        {days} : {hours} : {minutes} : {seconds}
    </div>
}