import React from 'react'
import FeatureCard from './FeatureCard'
import banner1 from "../../assets/icons/banner1.png";
import banner2 from "../../assets/icons/banner2.png";
import banner3 from "../../assets/icons/banner3.png";

export default function Features() {
    return (
        <div style={{ width: "100%", paddingTop: 80, color: "white" }}>
            <div style={{ width: "100%" }}>
                <div style={{ textAlign: "center", fontSize: 30, fontWeight: 500, color: "#777" }}>
                    Seamless Tool, Trusted Guidance
                </div>
                <div style={{ fontSize: 70, fontWeight: 600, width: "50%", textAlign: "center", textWrap: "wrap", margin: "auto", lineHeight: 1 }}>
                    Explore Powerful
                    <span style={{ position: "relative", display: "inline-block" }}>
                        <span style={{ position: "relative", background: "transparent", zIndex: 10 }}>Features</span>
                        <div style={{ position: "absolute", width: "100%", bottom: 0, left: 0, height: 12, backgroundColor: "#8940FF" }} />
                    </span>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", width: "80%", margin: "auto", justifyContent: "space-between", paddingTop: 45 }}>

                <FeatureCard imageSrc={banner1} heading={"Automation"} subHeading={"Streamline legal workflows effortlessly with intelligent automation, saving time and reducing manual tasks."} />
                <FeatureCard imageSrc={banner2} heading={"Precision"} subHeading={"Experience pinpoint accuracy in legal insights and advice, ensuring your solutions are tailored to your exact needs."} />
                <FeatureCard imageSrc={banner3} heading={"Accessibility"} subHeading={"Enjoy easy access to legal information anytime, anywhere, fostering a more accessible and inclusive legal experience for everyone."} />
            </div>
        </div >
    )
}
